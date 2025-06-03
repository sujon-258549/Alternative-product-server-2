import { Router } from 'express';
import { userRouter } from '../modules/Auth/simpleAuth/register.router';
import { product } from '../modules/product/product.router';
import { recommendation } from '../modules/recommendation/recommendation.router';
import { contactRouter } from '../modules/contactUs/contactUs.router';

const router = Router();

const allRouter = [
  {
    path: '/auth',
    router: userRouter,
  },
  {
    path: '/product',
    router: product,
  },
  {
    path: '/recommendation',
    router: recommendation,
  },
  {
    path: '/contact',
    router: contactRouter,
  },
];
allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
