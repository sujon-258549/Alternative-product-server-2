import { ObjectId } from 'mongoose';

export interface TProduct {
  // Ownership
  authorId: ObjectId;
  // Core product information
  productName: string;
  brandName: string;

  // Pricing
  price: number;
  originalPrice?: number; // For showing discounts
  currency?: string; // Default: 'USD'

  // Product details
  description: string;
  shortDescription?: string;
  productUrl?: string;

  // Inventory
  isInStock?: boolean;

  // Categorization
  categories: string;

  // Physical attributes
  weight?: number; // in grams

  // Digital product attributes
  isDigital?: boolean;
}
