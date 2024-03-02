import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware';
require('express-async-errors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

/* use routes */

// app.use(express.static("build"));

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'build/index.html'));
// });

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
