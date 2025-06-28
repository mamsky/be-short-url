import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { ShortUrl } from '../model/url.model';

export const createUrl = async (req: Request, res: Response) => {
  try {
    const url = req.body.url;
    const callBackUrl = uuid().slice(0, 5);
    await ShortUrl.create({ url, callBackUrl });
    res.json({
      message: 'Success',
      data: `${process.env.BASE_URL}/${callBackUrl}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
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
};
