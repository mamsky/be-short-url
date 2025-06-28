import express, { Request, Response } from 'express';
const app = express();
const port = 8080;
import cors from 'cors';
import env from 'dotenv';
env.config();
import { connect } from './config/db';
connect();
app.use(express.json());

app.use(
  cors({
    origin: `${process.env.FE_URL}`,
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
