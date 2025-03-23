import { Router } from 'express';
import { UserController } from './register.controller';

const router = Router();
router.post('/register', UserController.CreateUser);
router.post('/login', UserController.loginUser);

export const userRouter = router;
