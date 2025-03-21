import { Router } from 'express';
import { UserController } from './register.controller';

const router = Router();
router.post('/auth/register', UserController.CreateUser);

export const UserRouter = { router };
