import { NextFunction, Request, Response, Router } from 'express';
import { upload } from '../utility/uploadImageCloudinary';
import auth from '../utility/auth';
import { UserRole } from '../Auth/simpleAuth/register.const';
import { recommendationController } from './recommendation.controller';

const router = Router();

router.post(
  '/create-product/:id',
  auth(UserRole.user),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  //   auth(UserRole.user),
  recommendationController.createRecommendation,
);
router.get(
  '/product-recommendation',
  auth(UserRole.user),
  recommendationController.findSpecifyRecommendation,
);
router.get(
  '/:id',
  auth(UserRole.user),
  recommendationController.findSingleRecommendation,
);

router.get(
  '/my-recommendation',
  auth(UserRole.user),
  recommendationController.myRecommendation,
);
router.get(
  '/recommendation-for-me',
  auth(UserRole.user),
  recommendationController.recommendationForMe,
);
router.delete(
  '/my-recommendation/:id',
  auth('user'),
  recommendationController.deleteRecommendation,
);
router.patch(
  'update-my-recommendation/:id',
  auth(UserRole.user),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  recommendationController.updateMyRecommendation,
);

export const recommendation = router;
