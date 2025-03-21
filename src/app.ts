import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;
import cors from 'cors';
import router from './app/modules/Router';

app.use(express.json());
app.use(cors());

// router
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
