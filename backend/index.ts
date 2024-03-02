import app from './app';
import http from 'http';
import config from './utils/config';
import logger from './utils/logger';
import mongoose from 'mongoose';

logger.info('Connecting to db');

if (!config.MONGODB_URI) {
	logger.error('MONGODB_URI is not defined');
	throw new Error('MONGODB_URI is not defined');
}
mongoose
	.connect(config.MONGODB_URI!)
	.then(() => {
		logger.info('Connected to db');

		const server = http.createServer(app);

		if (!config.PORT) {
			logger.error('PORT is not defined');
			throw new Error('PORT is not defined');
		}
		server.listen(config.PORT, () => {
			logger.info(`Server running on port ${config.PORT}`);
		});
	})
	.catch((error: any) => {
		logger.error('coudlnt connect to db', error);
	});
