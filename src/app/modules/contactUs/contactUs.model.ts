import { Schema, model } from 'mongoose';
import { IContact } from './contactUs.interface';

// Mongoose Schema
const contactSchema = new Schema<IContact>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author selection is required'],
      ref: 'User', // Assuming this references a User model
    },
    sendId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author selection is required'],
      ref: 'User', // Assuming this references a User model
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [1, 'Message must be at least 10 characters'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  },
);

// Create and export the Model
const Contact = model<IContact>('Contact', contactSchema);
export default Contact;
