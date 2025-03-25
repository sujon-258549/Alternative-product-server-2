import express, { Application, Request, Response } from 'express';

const app: Application = express();
import cors from 'cors';
import router from './app/Router';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// router
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Everyone');
});

app.use(globalErrorHandler);
app.use('*', (req: Request, res: Response) => {
  res.status(400).json({ status: false, message: 'Route not found!' });
});

export default app;
