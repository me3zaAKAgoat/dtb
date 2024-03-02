import logger from './logger';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from './config';

import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	logger.info('Method:', req.method);
	logger.info('Path:', req.path);
	logger.info('Body:', req.body);
	logger.info('Time:', Date());
	logger.info('----:');
	next();
};

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.error(err.message);

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({
			error: 'invalid token',
		});
	}

	next(err);
};

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		req.token = authorization.substring(7);
	}
	const token = req.token;
	if (!token) {
		console.log('token missing');
		return res.status(401).json({ error: 'token missing' });
	}
	try {
		const secret = config.SECRET;
		if (!secret) {
			return res.status(500).json({ error: 'server error' });
		}
		const decodedToken = jwt.verify(token, config.SECRET!);
		if (!decodedToken || typeof decodedToken === 'string') {
			return res.status(401).json({ error: 'invalid token' });
		}
		if ((decodedToken as JwtPayload).exp! < Date.now() / 1000) {
			return res.status(401).json({ error: 'token expired' });
		}
	} catch (err) {
		return res.status(401).json({ error: 'invalid token' });
	}

	next();
};

const unknownEndpoint = (req: Request, res: Response) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

const userExtractor = (req: Request, res: Response, next: NextFunction) => {
	const token = req.token;
	if (!token) {
		return res.status(401).json({ error: 'token missing' });
	}
	try {
		const decodedToken = jwt.verify(token, config.SECRET!);
		if (!decodedToken || typeof decodedToken === 'string') {
			return res.status(401).json({ error: 'invalid token' });
		}
		req.userId = decodedToken.id;
	} catch (err) {
		return res.status(401).json({ error: 'invalid token' });
	}

	next();
};

export default {
	requestLogger,
	errorHandler,
	tokenExtractor,
	unknownEndpoint,
	userExtractor,
};
