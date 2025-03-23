import { Router } from 'express';
import { userRouter } from '../modules/Auth/register.router';

const router = Router();

const allRouter = [
  {
    path: '/auth',
    router: userRouter,
  },
];
allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
