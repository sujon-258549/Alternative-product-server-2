import { Router } from 'express';
import auth from '../utility/auth';
import { UserRole } from '../Auth/register.const';
import { mealProviderController } from './meal.provider.controller';

const router = Router();

router.post(
  '/create-order',
  auth(UserRole.user),
  mealProviderController.createMealProvider,
);
// router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);

export const mealProviderRouter = router;
