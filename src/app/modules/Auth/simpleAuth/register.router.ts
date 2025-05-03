import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from './register.controller';
import { userValidation } from './register.Validation';
import zodValidation from '../../utility/zodValidation';
import { upload } from '../../utility/uploadImageCloudinary';
import auth from '../../utility/auth';
import { UserRole } from './register.const';

const router = Router();
router.post(
  '/register',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.data);
    req.body = JSON.parse(req.body.data);
    next();
  },
  //   zodValidation(userValidation.registerSchema),
  UserController.CreateUser,
);
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
router.post('/get-me', auth(UserRole.user), UserController.getMe);
router.post('/set-image', auth(UserRole.user), UserController.setImageIntoUser);
export const userRouter = router;
