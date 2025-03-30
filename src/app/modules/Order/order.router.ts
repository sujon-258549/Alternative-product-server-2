import { Router } from 'express';
import auth from '../utility/auth';
import { UserRole } from '../Auth/register.const';
import { orderController } from './order.controller';

const router = Router();

router.post('/order', auth(UserRole.user), orderController.createOrder);
// router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);

export const restaurantRouter = router;
