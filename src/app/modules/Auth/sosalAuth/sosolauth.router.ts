import { Router } from 'express';
import { sosalAuthController } from './sosalauth.controller';

const router = Router();
router.post('/login-sosal-user', sosalAuthController.createAuthLogin);

export const sosalLoginUserRouter = router;
