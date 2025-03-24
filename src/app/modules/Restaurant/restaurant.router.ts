import { Router } from 'express';
import { restaurantController } from './restaurant.controller';
import auth from '../utility/auth';
import { UserRole } from '../Auth/register.const';

const router = Router();

router.post(
  '/menu',
  auth(UserRole.restaurant),
  restaurantController.createMenuForDay,
);

export const restaurantRouter = router;
