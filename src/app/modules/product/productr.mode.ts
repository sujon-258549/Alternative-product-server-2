import mongoose, { Schema } from 'mongoose';
import { TProduct } from './product.interfaces';

const productSchema = new Schema<TProduct>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    productUrl: { type: String, required: true },
    isInStock: { type: Boolean, required: true },
    categories: { type: String, required: true },
    weight: { type: Number, required: true },
    isDigital: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const Product = mongoose.model<TProduct>('product', productSchema);

export default Product;
