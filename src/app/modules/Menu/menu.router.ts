import { Router } from 'express';
import { restaurantController } from './menu.controller';
import auth from '../utility/auth';
import { UserRole } from '../Auth/simpleAuth/register.const';

const router = Router();

router.post(
  '/menu',
  auth(UserRole.mealprovider),
  restaurantController.createMenuForDay,
);
router.get('/menu', restaurantController.findAllMenu);
router.get(
  '/menu/:id',
  auth(UserRole.user),
  restaurantController.findSingleMenu,
);
router.get(
  '/my-menu',
  auth(UserRole.mealprovider),
  restaurantController.findMyMenu,
);
router.put(
  '/my-menu',
  auth(UserRole.mealprovider),
  restaurantController.updateMyMenu,
);

export const restaurantRouter = router;
