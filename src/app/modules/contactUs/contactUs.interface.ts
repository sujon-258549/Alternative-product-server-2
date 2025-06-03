import { ObjectId } from 'mongoose';

export interface IContact {
  id: ObjectId; // Reference to the selected author
  sendId: ObjectId; // Reference to the selected author
  message: string;
}
