import { ObjectId } from 'mongoose';

export interface TRecommendation {
  recommendationAuthorId: ObjectId;
  authorId: ObjectId;
  productId: ObjectId;
  productName: string;
  brandName: string;
  recommendationImage?: string;

  // Pricing
  price: number;
  originalPrice?: number; // For showing discounts
  currency?: string; // Default: 'USD'

  // Product details
  description: string;
  shortDescription?: string;

  // Inventory
  isInStock?: boolean;

  // Categorization
  categories: string;

  // Physical attributes
  weight?: number; // in grams

  // Digital product attributes
  isDigital?: boolean;
}
