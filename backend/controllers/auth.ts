import express, { Request, Response } from 'express';
const authRouter = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/mail';
import { verificationMailTemplate } from '../utils/htmlTemplates';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/user';
import config from '../utils/config';
import { userSchema } from '../utils/validators';

authRouter.post('/signup', async (req: Request, res: Response) => {
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
			isVerified: false,
			verificationToken: uuidv4(),
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
authRouter.get('/verify/:token', async (req: Request, res: Response) => {
	const token = req.params.token;
	const user = await User.findOne({ verificationToken: token });
	if (!user) {
		return res.status(400).json({ error: 'Invalid token' });
	}
	if (user.isVerified) {
		return res.status(400).json({ error: 'Account is already verified' });
	}
	user.isVerified = true;
	try {
		await user.save();
		res.setHeader('Content-Type', 'text/html');
		return res.status(200).send('<h1>Account is now verified</h1>');
	} catch (error: any) {
		return res.status(400).json({ error: error.message });
	}
});

authRouter.post('/login', async (req: Request, res: Response) => {
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

		if (!user.isVerified) {
			return res.status(401).json({ error: 'Account not isVerified' });
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

export default authRouter;
