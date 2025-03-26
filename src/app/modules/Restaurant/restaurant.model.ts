import mongoose, { Schema } from 'mongoose';
import { TMenu, TMenuItem } from './restaurant.interface';

const MenuItemSchema = new Schema<TMenuItem>({
  menu: { type: String, required: true },
  price: { type: Number, required: true },
});

const MenuSchema = new Schema<TMenu>(
  {
    day: { type: String, required: true },
    author_id: { type: String, required: true, ref: 'User' },
    morning: { type: MenuItemSchema, required: true },
    evening: { type: MenuItemSchema, required: true },
    night: { type: MenuItemSchema, required: true },
  },
  { timestamps: true },
);

export const Restaurant = mongoose.model<TMenu>('Menu', MenuSchema);
