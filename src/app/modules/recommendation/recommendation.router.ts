import { Router } from 'express';

import auth from '../utility/auth';
import { UserRole } from '../Auth/simpleAuth/register.const';
import { recommendationController } from './recommendation.controller';

const router = Router();

router.post(
  '/create-recommended/:id',
  auth(UserRole.user),
  recommendationController.createRecommendation,
);
router.get(
  '/product-recommendation/:id',
  auth(UserRole.user),
  recommendationController.findSpecifyRecommendation,
);
router.get('/', recommendationController.findAllRecommendation);

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
router.get(
  '/recommendation-related-product/:id',
  auth(UserRole.user),
  recommendationController.recommendationRelatedProduct,
);
router.get(
  '/:id',
  auth(UserRole.user),
  recommendationController.findSingleRecommendation,
);

router.delete(
  '/my-recommendation/:id',
  auth('user'),
  recommendationController.deleteRecommendation,
);
router.patch(
  '/update-my-recommendation/:id',
  auth(UserRole.user),
  recommendationController.updateMyRecommendation,
);

export const recommendation = router;
