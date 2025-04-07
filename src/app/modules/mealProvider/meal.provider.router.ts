import { NextFunction, Request, Response, Router } from 'express';
// import auth from '../utility/auth';
// import { UserRole } from '../Auth/register.const';
import { mealProviderController } from './meal.provider.controller';
import { upload } from '../utility/uploadImageCloudinary';

const router = Router();

router.post(
  '/create-mealProvider',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  //   auth(UserRole.user),
  mealProviderController.createMealProvider,
);
// router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);

export const mealProviderRouter = router;
