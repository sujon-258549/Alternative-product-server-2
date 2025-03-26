import { Router } from 'express';
import { UserController } from './register.controller';
import { userValidation } from './register.Validation';
import zodValidation from '../utility/zodValidation';

const router = Router();
router.post(
  '/register',
  zodValidation(userValidation.registerSchema),
  UserController.CreateUser,
);
router.post('/login', UserController.loginUser);
router.post(
  '/create-access-token',
  zodValidation(userValidation.refreshTokenSchema),
  UserController.refreshTokenUseCreateSecretToken,
);

export const userRouter = router;
