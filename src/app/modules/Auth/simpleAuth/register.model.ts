import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TAddress, TRegister, TSocialMediaLinks } from './register.interface';

const addressSchema = new Schema<TAddress>(
  {
    village: { type: String, required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    post: { type: String, required: true },
    postCode: { type: String, required: true },
  },
  { _id: false },
);
const socialMediaLinksSchema = new Schema<TSocialMediaLinks>(
  {
    facebook: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  { _id: false },
);

const UserSchema = new Schema<TRegister>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    nidNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },

    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    socialMesaLink: {
      type: socialMediaLinksSchema,
    },
    secondaryPhone: {
      type: Number,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/user-circle-with-blue-gradient-circle_78370-4727.jpg?ga=GA1.1.323587279.1748262069&semt=ais_items_boosted&w=740',
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 5);
  next();
});

export const User = model<TRegister>('User', UserSchema);
