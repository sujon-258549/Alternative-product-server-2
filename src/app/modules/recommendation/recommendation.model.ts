import mongoose, { Schema } from 'mongoose';
import { TRecommendation } from './recommendation.interface';

const recommendationSchema = new Schema<TRecommendation>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recommendationAuthorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'product',
    },
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    categories: { type: String, required: true },
    weight: { type: Number, required: true },
    isDigital: { type: Boolean, required: true },
    recommendationImage: { type: String },
  },
  {
    timestamps: true,
  },
);

const Recommendation = mongoose.model<TRecommendation>(
  'recommendation',
  recommendationSchema,
);
export default Recommendation;
