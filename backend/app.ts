import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware';
import 'express-async-errors';
import userRouter from './controllers/user';
import cycleRouter from './controllers/cycle';
import authRouter from './controllers/auth';
// import taskRouter from './controllers/task';

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

/* use routes */

// app.use(express.static("build"));

app.use('/api/auth', authRouter);
app.use(
	'/api/users',
	middleware.tokenExtractor,
	middleware.userExtractor,
	userRouter,
);
app.use(
	'/api/cycles',
	middleware.tokenExtractor,
	middleware.userExtractor,
	cycleRouter,
);

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'build/index.html'));
// });

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
