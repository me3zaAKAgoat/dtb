import express from 'express';
const userRouter = express.Router();
import User from '../models/user';
import bcrypt from 'bcrypt';
import Validator from 'joi';
import config from '../utils/config';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import sendEmail from '../utils/mail';
import { verificationMailTemplate } from '../utils/mailTemplates';
import { v4 as uuidv4 } from 'uuid';
import cloudinary_ from 'cloudinary';
const cloudinary = cloudinary_.v2;
import middleware from '../utils/middleware';
import fs from 'fs';
import passwordComplexity from 'joi-password-complexity';
import { Request, Response } from 'express';

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

const userSchema = Validator.object({
	username: Validator.string().required(),
	firstName: Validator.string().required(),
	lastName: Validator.string().required(),
	email: Validator.string().email().required(),
	password: passwordComplexity({
		min: 8,
		max: 25,
		lowerCase: 1,
		upperCase: 1,
		numeric: 1,
		symbol: 1,
		requirementCount: 4,
	}),
});

userRouter.post('/signup', async (req: Request, res: Response) => {
	const body = req.body;
	try {
		await userSchema.validateAsync(body);
	} catch (error: any) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const emailExists = await User.findOne({ email: body.email });
	if (emailExists) {
		return res.status(400).json({ error: 'Email already exists' });
	}
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);
	try {
		const user = new User({
			username: body.username,
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			passwordHash: passwordHash,
			verified: false,
			verficiationToken: uuidv4(),
		});

		try {
			await sendEmail(
				user.email,
				'Verify your account',
				verificationMailTemplate(user.firstName, user.verificationToken),
			);
		} catch (err) {
			console.error(err);
			return res
				.status(400)
				.json({ error: 'Verification Email could not be sent' });
		}

		await user.save();

		return res
			.status(201)
			.json({ message: 'Verification email has been sent to' + user.email });
	} catch (error: any) {
		console.error(error);
		return res.status(400).json({ error: error.message });
	}
});

/** should this be a get or a post request? */
userRouter.get('/verify/:token', async (req: Request, res: Response) => {
	const token = req.params.token;
	const user = await User.findOne({ verficiationToken: token });
	if (!user) {
		return res.status(400).json({ error: 'Invalid token' });
	}
	if (user.verified) {
		return res.status(400).json({ error: 'Account already verified' });
	}
	user.verified = true;
	try {
		await user.save();
		res.setHeader('Content-Type', 'text/html');
		return res.status(200).send('<h1>Account verified</h1>');
	} catch (error: any) {
		return res.status(400).json({ error: error.message });
	}
});

userRouter.post('/login', async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json({ error: 'Credentials are incorrect' });
		}

		const passwordCheck = await bcrypt.compare(
			req.body.password,
			user.passwordHash,
		);

		if (!passwordCheck) {
			return res.status(401).json({ error: 'Credentials are incorrect' });
		}

		if (!user.verified) {
			return res.status(401).json({ error: 'Account not verified' });
		}

		const tokenPayload = {
			id: user._id,
		};

		const tokenExpirationParam = config.TOKEN_EXPIRATION; //expiration of a user session
		const token = jwt.sign(tokenPayload, config.SECRET!, {
			expiresIn: tokenExpirationParam,
		});

		return res.status(200).json({
			token,
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar: user.avatar,
			expiryDate: tokenExpirationParam,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'server error' });
	}
});

/** this is not done yet !!! */
userRouter.put(
	'/avatar',
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
			return res.status(500).json({ error: 'Internal server error' });
		}
	},
);

/** two routers one for updating first name and last name and one for updating password */

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
		const passwordSchema = Validator.object({
			password: passwordComplexity({
				min: 8,
				max: 25,
				lowerCase: 1,
				upperCase: 1,
				numeric: 1,
				symbol: 1,
				requirementCount: 4,
			}),
		});
		try {
			await passwordSchema.validateAsync(body);
		} catch (error: any) {
			return res.status(400).json({ error: error.details[0].message });
		}
		try {
			const user = await User.findById(decodedToken.id);

			if (!user) return res.status(404).json({ error: 'User not found' });

			const passwordCheck = await bcrypt.compare(
				req.body.OldPassword,
				user.passwordHash,
			);

			if (!passwordCheck) {
				return res.status(401).json({ error: 'Bad Old Password' });
			}

			const passwordHash = await bcrypt.hash(body.password, 10);
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
