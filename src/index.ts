import env from 'dotenv';
env.config();
import express, { Request, Response } from 'express';
import { connect } from './config/db';
const app = express();
const port = 8080;
connect();
app.use(express.json());

import shortRouter from './routes/short.routes';
app.get('/', (_req: Request, res: Response) => {
  res.send('Short Url create by paste');
});

app.use('/', shortRouter);

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
