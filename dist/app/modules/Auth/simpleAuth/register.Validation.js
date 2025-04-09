"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const refreshTokenSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required!',
        }),
    }),
});
const registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email format' }),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
exports.userValidation = { refreshTokenSchema, registerSchema };
