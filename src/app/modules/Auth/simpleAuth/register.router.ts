import { UserController } from './register.controller';
import { userValidation } from './register.Validation';
import zodValidation from '../../utility/zodValidation';
import auth from '../../utility/auth';
import { UserRole } from './register.const';
import { Router } from 'express';

const router = Router();
router.post('/register', UserController.CreateUser);
router.patch('/update', UserController.updateUser);
router.post('/login', UserController.loginUser);
router.post(
  '/create-access-token',
  zodValidation(userValidation.refreshTokenSchema),
  UserController.refreshTokenUseCreateSecretToken,
);
router.post('/forget-password', UserController.forgetPassword);
router.post(
  '/reset-password',

  UserController.resetPassword,
);
router.post(
  '/change-password',
  auth(UserRole.user),
  UserController.changePassword,
);
router.get('/get-me', auth(UserRole.user), UserController.getMe);
router.post('/set-image', auth(UserRole.user), UserController.setImageIntoUser);
export const userRouter = router;
