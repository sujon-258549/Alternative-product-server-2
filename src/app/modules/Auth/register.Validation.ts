import { z } from 'zod';

const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required!',
    }),
  }),
});

const registerSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['admin', 'restaurant', 'user'], {
      message: "Role must be 'admin', 'restaurant', or 'user'",
    }),
  }),
});

export const userValidation = { refreshTokenSchema, registerSchema };
