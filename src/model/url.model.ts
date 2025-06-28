import mongoose, { Date, Document, Schema } from 'mongoose';

export interface ShortUrlType extends Document {
  url: string;
  callBackUrl: string;
  createdAt: Date;
}

const ShortUrlSchema: Schema<ShortUrlType> = new Schema({
  url: { type: String, required: true },
  callBackUrl: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export const ShortUrl =
  mongoose.models.url_short ||
  mongoose.model<ShortUrlType>('url_short', ShortUrlSchema);
