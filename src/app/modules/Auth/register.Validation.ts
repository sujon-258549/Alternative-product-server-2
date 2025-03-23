import { z } from 'zod';

const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required!',
    }),
  }),
});

export const userValidation = { refreshTokenSchema };
