import { Router } from 'express';
import { userRouter } from '../modules/Auth/register.router';
import { restaurantRouter } from '../modules/Restaurant/restaurant.router';

const router = Router();

const allRouter = [
  {
    path: '/auth',
    router: userRouter,
  },
  {
    path: '/restaurant',
    router: restaurantRouter,
  },
];
allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
