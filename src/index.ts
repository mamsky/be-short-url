const app = express();
const port = 8080;
import cors from 'cors';
import env from 'dotenv';
env.config();
import express, { Request, Response } from 'express';
import { connect } from './config/db';
connect();
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173/'],
    methods: ['GET, POST'],
  }),
);

import shortRouter from './routes/short.routes';
app.get('/', (_req: Request, res: Response) => {
  res.send('Short Url create by paste');
});

app.use('/', shortRouter);

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
