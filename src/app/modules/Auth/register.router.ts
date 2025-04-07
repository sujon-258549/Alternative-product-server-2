import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from './register.controller';
import { userValidation } from './register.Validation';
import zodValidation from '../utility/zodValidation';
import { upload } from '../utility/uploadImageCloudinary';

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

export const userRouter = router;
