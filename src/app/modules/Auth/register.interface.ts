export interface TRegister {
  email: string;
  password: string;
  role: 'admin' | 'restaurant' | 'user';
}

export interface TLogin {
  email: string;
  password: string;
}
