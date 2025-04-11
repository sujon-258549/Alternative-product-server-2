import { Router } from 'express';
import { userRouter } from '../modules/Auth/simpleAuth/register.router';
import { restaurantRouter } from '../modules/Menu/menu.router';
import { orderRouter } from '../modules/Order/order.router';
import { mealProviderRouter } from '../modules/mealProvider/meal.provider.router';
import { sosalLoginUserRouter } from '../modules/Auth/sosalAuth/sosolauth.router';
import { SSLRoutes } from '../modules/sslCommeriz/sslCommeriz.router';

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
  {
    path: '/sosal',
    router: sosalLoginUserRouter,
  },
  {
    path: '/ssl',
    router: SSLRoutes,
  },
];
allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
