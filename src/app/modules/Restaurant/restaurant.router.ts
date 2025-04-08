import { Router } from 'express';
import { restaurantController } from './restaurant.controller';
import auth from '../utility/auth';
import { UserRole } from '../Auth/simpleAuth/register.const';

const router = Router();

router.post(
  '/menu',
  auth(UserRole.restaurant),
  restaurantController.createMenuForDay,
);
router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);

export const restaurantRouter = router;
