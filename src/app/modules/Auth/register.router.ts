import { Router } from 'express';
import { UserController } from './register.controller';
import { userValidation } from './register.Validation';
import zodValidation from '../utility/zodValidaction';

const router = Router();
router.post('/register', UserController.CreateUser);
router.post('/login', UserController.loginUser);
router.post(
  '/create-access-token',
  zodValidation(userValidation.refreshTokenSchema),
  UserController.refreshTokenUseCreateSecretToken,
);

export const userRouter = router;
