import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TRegister } from './register.interface';

const UserSchema = new Schema<TRegister>(
  {
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
    role: {
      type: String,
      enum: ['admin', 'restaurant', 'user'],
      default: 'user',
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    secondaryPhone: {
      type: Number,
      required: true,
      unique: true,
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
