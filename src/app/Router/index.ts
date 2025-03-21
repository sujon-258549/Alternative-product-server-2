import { Router } from 'express';
import app from '../../app';

const router = Router();

const allRouter = [
  {
    path: 'auth',
    router: app,
  },
];
allRouter.forEach((route) => router.use(route.path, route.router));
export default router;
