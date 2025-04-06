export interface TMaleProvider {
  shopName: string;
  shopAddress: string;
  shopId: string;
  shipLogo: string;
  phoneNumber: string; // Contact number
  email: string; // Email address
  website?: string; // Optional website URL
  ownerName: string; // Name of the shop owner
  establishedYear: number; // Year the shop was established
  productCategories: string[]; // List of product categories the shop offers
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  }; // Optional social media links
  rating: number; // Rating of the shop (out of 5)
  isActive: boolean; // Indicates whether the shop is active or not
  operatingHours: {
    open: string; // Opening time (e.g., "9:00 AM")
    close: string; // Closing time (e.g., "9:00 PM")
    daysOpen: string[]; // Days of the week the shop is open
  };
  paymentMethods: string[]; // Accepted payment methods (e.g., "Cash", "Card", "Mobile Payment")
  shippingMethods: string[]; // Available shipping methods (e.g., "Standard", "Express")
  returnPolicy?: string; // Optional return policy
  customerServiceContact?: string; // Optional customer service contact information
  reviews?: {
    user: string;
    rating: number; // Rating from the user (out of 5)
    reviewText: string; // Text of the user's review
    date: string; // Date when the review was written
  }[]; // Optional reviews from customers
  isVerified: boolean; // Indicates whether the shop has been verified or not
  discountOffers?: string[]; // Optional list of current discount offers or promotions
  countryOfOrigin?: string; // Optional field for the country where the shop is based
}
