import { UserRole } from './register.const';

export interface TAddress {
  village: string;
  district: string;
  subDistrict: string;
  post: string;
  postCode: string;
}
export interface TSocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}
export interface TRegister {
  fullName: string; //full name
  email: string;
  password: string;
  role: 'admin' | 'user';
  address: TAddress;
  dateOfBirth: string; // corrected spelling from "dateOfBarth"
  gender: 'male' | 'female' | 'other';
  phone: number;
  secondaryPhone?: number; // made optional if not always required
  socialMesaLink?: TSocialMediaLinks;
  profileImage?: string; // optional profile photo URL
  nidNumber?: string; // for identity verification (if applicable)
  isBlock?: boolean;
  isDelete?: boolean;
}

export interface TLogin {
  email: string;
  password: string;
}

export type TUserRole = keyof typeof UserRole;
