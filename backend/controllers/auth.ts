import express, { Request, Response } from 'express';
const authRouter = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../utils/config';
import { userSchema } from '../utils/validators';
import ms from 'ms';

authRouter.post('/signup', async (req: Request, res: Response) => {
	const body = req.body;
	try {
		await userSchema.validateAsync(body);
	} catch (error: any) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);
	try {
		const user = new User({
			username: body.username,
			passwordHash: passwordHash,
		});

		await user.save();

		return res
			.status(201)
			.json({ message: 'account has been created' });
	} catch (error: any) {
		console.error(error);
		if (error.code === 11000) {
			return res.status(400).json({ error: 'username already exists' });
		}
		return res.status(400).json({ error: error.message });
	}
});

authRouter.post('/login', async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ username: req.body.username });
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
			expiryDate: new Date(Date.now() + ms(tokenExpirationParam!)),
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'server error' });
	}
});

export default authRouter;
