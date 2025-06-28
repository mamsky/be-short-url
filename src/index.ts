import env from 'dotenv';
env.config();
import express, { Request, Response } from 'express';
import { connect } from './config/db';
import { ShortUrl } from './model/url.model';
import { v4 as uuid } from 'uuid';
const app = express();
const port = 8080;
connect();
app.use(express.json());

app.post('/short-link', async (req: Request, res: Response) => {
  try {
    const url = req.body.url;
    const callBackUrl = uuid().slice(0, 5);
    await ShortUrl.create({ url, callBackUrl });
    res.json({ shortUrl: `${process.env.BASE_URL}/${callBackUrl}` });
  } catch (error) {
    console.log(error);
  }
});

app.get('/:callBackUrl', async (req: Request, res: Response) => {
  try {
    const params = req.params.callBackUrl;
    const data = await ShortUrl.findOne({
      callBackUrl: params,
    });
    if (data) {
      res.redirect(data.url);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
