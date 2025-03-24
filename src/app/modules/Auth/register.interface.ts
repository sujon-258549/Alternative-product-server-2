import { UserRole } from './register.const';

export interface TRegister {
  email: string;
  password: string;
  role: 'admin' | 'restaurant' | 'user';
}

export interface TLogin {
  email: string;
  password: string;
}

export type TUserRole = keyof typeof UserRole;
