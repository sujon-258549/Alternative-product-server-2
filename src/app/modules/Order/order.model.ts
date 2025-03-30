import mongoose, { Schema } from 'mongoose';

// Define Menu Item Schema
const MenuItemSchema = new Schema({
  menu: { type: String, required: true },
  price: { type: Number, required: true },
});

// Define Daily Menu Schema
const DayMenuSchema = new Schema({
  day: { type: String, required: true },
  morning: { type: MenuItemSchema, required: true },
  evening: { type: MenuItemSchema, required: true },
  night: { type: MenuItemSchema, required: true },
});

// Define Main Menu Schema
const MenuSchema = new Schema(
  {
    author_id: { type: String, required: true },
    orderId: { type: String, required: true },
    days: { type: [DayMenuSchema], required: true }, // Array of daily menus
  },
  { timestamps: true },
);

// Define Mongoose Model
const MenuModel = mongoose.model('order', MenuSchema);

export default MenuModel;
