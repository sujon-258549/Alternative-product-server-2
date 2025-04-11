import mongoose, { Schema } from 'mongoose';
import { IDayMenu, IMenuItem } from './menu.interface';

const MenuItemSchema = new Schema<IMenuItem>({
  menu: { type: String, required: true },
  price: { type: Number, required: true },
});

const DayMenuSchema = new Schema<IDayMenu>({
  day: { type: String },
  morning: { type: MenuItemSchema },
  evening: { type: MenuItemSchema },
  night: { type: MenuItemSchema },
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
