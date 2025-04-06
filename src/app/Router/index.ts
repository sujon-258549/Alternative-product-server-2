import { Router } from 'express';
import { userRouter } from '../modules/Auth/register.router';
import { restaurantRouter } from '../modules/Restaurant/restaurant.router';
import { orderRouter } from '../modules/Order/order.router';
import { mealProviderRouter } from '../modules/mealProvider/meal.provider.router';

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
  {
    path: '/order',
    router: orderRouter,
  },
  {
    path: '/meal-provider',
    router: mealProviderRouter,
  },
];
allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
