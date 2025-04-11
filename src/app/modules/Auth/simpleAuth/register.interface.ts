import { UserRole } from './register.const';

export interface TAddress {
  village: string;
  district: string;
  subDistrict: string;
  post: string;
  postCode: string;
}

export interface TRegister {
  fullName: string;
  email: string;
  password: string;
  role: 'admin' | 'mealprovider' | 'user';
  address: TAddress;
  dateOfBirth: string; // corrected spelling from "dateOfBarth"
  gender: 'male' | 'female' | 'other';
  phone: number;
  secondaryPhone?: number; // made optional if not always required
  profileImage?: string; // optional profile photo URL
  nidNumber?: string; // for identity verification (if applicable)
  isShop?: boolean;
  isBlock?: boolean;
  isDelete?: boolean;
}

export interface TLogin {
  email: string;
  password: string;
}

export type TUserRole = keyof typeof UserRole;
