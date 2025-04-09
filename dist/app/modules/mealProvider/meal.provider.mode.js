"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const providerSchema = new mongoose_1.Schema({
    shopName: { type: String, required: true },
    authorShopId: { type: String, required: true },
    userid: { type: String, required: true },
    shopAddress: { type: String, required: true },
    shopLogo: { type: String },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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
    rating: { type: Number },
    isActive: { type: Boolean },
    operatingHours: {
        open: { type: String, required: true },
        close: { type: String, required: true },
        daysOpen: { type: [String], required: true },
    },
    paymentMethods: { type: [String], required: true },
    shippingMethods: { type: [String], required: true },
    returnPolicy: { type: String },
    customerServiceContact: { type: String },
    isVerified: { type: Boolean, required: true },
    countryOfOrigin: { type: String },
});
// Create and export the model
const MaleProvider = mongoose_1.default.model('MaleProvider', providerSchema);
exports.default = MaleProvider;
