import express from 'express';
const userRouter = express.Router();
import User from '../models/user';
import bcrypt from 'bcrypt';
import Validator from 'joi';
import config from '../utils/config';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cloudinary_ from 'cloudinary';
const cloudinary = cloudinary_.v2;
import middleware from '../utils/middleware';
import fs from 'fs';
import { Request, Response } from 'express';
import { passwordSchema } from '../utils/validators';

const upload = multer({
	dest: 'uploads/',
	fileFilter: (req: Request, file, cb) => {
		const fileSize = parseInt(req.headers['content-length'] as string);

		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			req.fileValidationError = 'Only image files are allowed!';
		}
		if (fileSize > 3000000) {
			req.fileValidationError = 'File size too large';
		}
		cb(null, true);
	},
});

const deleteFiles = (files: any[]) => {
	files.forEach((file) => {
		fs.unlink(file.path, (err) => {
			if (err) {
				console.error('Error deleting file:', err);
			}
		});
	});
};

/** this is not done yet !!! */
userRouter.put(
	'/information/avatar',
	middleware.tokenExtractor,
	upload.single('avatar'),
	async (req: Request, res: Response) => {
		const token = req.token;
		const decodedToken = jwt.verify(token!, config.SECRET!);
		if (!decodedToken || typeof decodedToken === 'string' || !decodedToken.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}
			const user = await User.findById(decodedToken.id);
			if (!user) return res.status(404).json({ error: 'User not found' });

			if (req.fileValidationError) {
				if (req.file) {
					deleteFiles([req.file]);
				}
				return res.status(400).json({ error: req.fileValidationError });
			}
			cloudinary.config({
				cloud_name: config.CLOUDINARY_CLOUD_NAME,
				api_key: config.CLOUDINARY_API_KEY,
				api_secret: config.CLOUDINARY_API_SECRET,
			});
			/** delete previous avatar */
			if (user.avatar) {
				const publicId = user.avatar.split('/').pop()?.split('.')[0];
				if (!publicId) {
					return res.status(500).json({ error: 'Internal server error' });
				}
				await cloudinary.uploader.destroy(publicId);
			}

			const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
				folder: 'avatars',
				quality: 20,
			});

			deleteFiles([req.file]);

			user.avatar = cloudinaryImage.secure_url;
			await user.save();
			return res.status(200).json({ avatar: user.avatar });
		} catch (error: any) {
			console.error(error);
			deleteFiles([req.file]);
			return res.status(500).json({ error: 'Internal server error' });
		}
	},
);

/** two routers one for updating first name and last name and one for updating password */

userRouter.put('/information/username', async (req: Request, res: Response) => {
	const token = req.token;
	const decodedToken = jwt.verify(token!, config.SECRET!);
	if (!token || typeof decodedToken === 'string' || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}
	const usernameSchema = Validator.object({
		username: Validator.string().required(),
	});
	try {
		await usernameSchema.validateAsync(req.body);
	} catch (error: any) {
		return res.status(400).json({ error: error.details[0].message });
	}
	try {
		const user = await User.findById(decodedToken.id);
		if (!user) return res.status(404).json({ error: 'User not found' });

		user.username = req.body.username;
		await user.save();
		return res.status(200).json({ message: 'Username updated' });
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

userRouter.put(
	'/information/fistname-lastname',
	middleware.tokenExtractor,
	async (req: Request, res: Response) => {
		const token = req.token;
		const decodedToken = jwt.verify(token!, config.SECRET!);
		if (!token || typeof decodedToken === 'string' || !decodedToken.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}
		const body = req.body;
		const firstNameLastNameSchema = Validator.object({
			firstName: Validator.string().required(),
			lastName: Validator.string().required(),
		});

		try {
			await firstNameLastNameSchema.validateAsync(body);
		} catch (error: any) {
			return res.status(400).json({ error: error.details[0].message });
		}
		try {
			const user = await User.findById(decodedToken.id);
			if (!user) return res.status(404).json({ error: 'User not found' });

			user.firstName = body.firstName;
			user.lastName = body.lastName;
			await user.save();
			return res.status(200).json({ message: 'Information updated' });
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	},
);

userRouter.put(
	'/information/password',
	middleware.tokenExtractor,
	async (req: Request, res: Response) => {
		const token = req.token;
		const decodedToken = jwt.verify(token!, config.SECRET!);
		if (!token || typeof decodedToken === 'string' || !decodedToken.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}
		const body = req.body;

		try {
			await passwordSchema.validateAsync({
				password: body.newPassword,
			});
		} catch (error: any) {
			return res.status(400).json({ error: error.details[0].message });
		}
		try {
			const user = await User.findById(decodedToken.id);

			if (!user) return res.status(404).json({ error: 'User not found' });

			const passwordCheck = await bcrypt.compare(
				req.body.oldPassword,
				user.passwordHash,
			);

			if (!passwordCheck) {
				return res.status(401).json({ error: 'Bad Old Password' });
			}

			const passwordHash = await bcrypt.hash(body.newPassword, 10);
			user.passwordHash = passwordHash;
			await user.save();
			return res.status(200).json({ message: 'Password updated' });
		} catch (error: any) {
			console.error(error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	},
);

export default userRouter;
