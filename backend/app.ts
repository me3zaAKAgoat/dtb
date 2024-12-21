import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware';
import 'express-async-errors';
import userRouter from './controllers/user';
import cycleRouter from './controllers/cycle';
import authRouter from './controllers/auth';
import taskRouter from './controllers/task';
import path from 'path';

const app = express();

app.use(cors({}));

app.use(express.json());
app.use(middleware.requestLogger);

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/auth', authRouter);
app.use(
	'/api/user',
	middleware.tokenExtractor,
	middleware.userExtractor,
	userRouter,
);
app.use(
	'/api/cycle',
	middleware.tokenExtractor,
	middleware.userExtractor,
	cycleRouter,
);
app.use(
	'/api/task',
	middleware.tokenExtractor,
	middleware.userExtractor,
	taskRouter,
);

app.get('/api/health', (req, res) => {
	console.log('Health endpoint hit'); // Log to check if the route is triggered
	res.status(200).json({ status: 'healthy' });
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
