export interface TJwtPayload {
  email: string;
  role: 'restaurant' | 'admin' | 'user'; // You can add other roles if needed
  id: string;
  iat: number; // Issued At Timestamp
  exp: number; // Expiration Timestamp
}
