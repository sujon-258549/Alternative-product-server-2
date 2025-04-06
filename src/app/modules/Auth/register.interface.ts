import { UserRole } from './register.const';

export interface TRegister {
  email: string;
  password: string;
  role: 'admin' | 'restaurant' | 'user';
  address: string;
  phone: number;
  secondaryPhone: number;
}

export interface TLogin {
  email: string;
  password: string;
}

export type TUserRole = keyof typeof UserRole;
