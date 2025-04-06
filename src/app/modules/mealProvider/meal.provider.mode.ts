import mongoose, { Schema } from 'mongoose';
import { TMaleProvider } from './meal.provider.interfaces';

const providerSchema = new Schema<TMaleProvider>({
  shopName: { type: String, required: true },
  shopId: { type: String, required: true },
  shopAddress: { type: String, required: true },
  shipLogo: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  ownerName: { type: String, required: true },
  establishedYear: { type: Number, required: true },
  productCategories: { type: [String], required: true },
  socialMediaLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
  },
  rating: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  operatingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true },
    daysOpen: { type: [String], required: true },
  },
  paymentMethods: { type: [String], required: true },
  shippingMethods: { type: [String], required: true },
  returnPolicy: { type: String },
  customerServiceContact: { type: String },
  reviews: [
    {
      user: { type: String },
      rating: { type: Number },
      reviewText: { type: String },
      date: { type: String },
    },
  ],
  isVerified: { type: Boolean, required: true },
  discountOffers: { type: [String] },
  countryOfOrigin: { type: String },
});

// Create and export the model
const MaleProvider = mongoose.model<TMaleProvider>(
  'MaleProvider',
  providerSchema,
);

export default MaleProvider;
