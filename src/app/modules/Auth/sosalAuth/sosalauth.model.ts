import { model, Schema } from 'mongoose';
import { TSosalAuth } from './sosalauth.interfaces';

const sosalLoginSchema = new Schema<TSosalAuth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true },
);

export const SosalAuth = model<TSosalAuth>('SosalLogin', sosalLoginSchema);
