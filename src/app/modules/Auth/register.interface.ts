export interface TRegister {
  email: string;
  password: string;
  role: 'admin' | 'restaurant' | 'user';
}
