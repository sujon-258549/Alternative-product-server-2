import { Router } from 'express';
import auth from '../utility/auth';
import { UserRole } from '../Auth/simpleAuth/register.const';
import { orderController } from './order.controller';

const router = Router();

router.post('/create-order', auth(UserRole.user), orderController.createOrder);
// router.get('/menu', auth(UserRole.restaurant), restaurantController.findMyMenu);

export const orderRouter = router;
