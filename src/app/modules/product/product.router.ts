import { Router } from 'express';

import auth from '../utility/auth';
import { UserRole } from '../Auth/simpleAuth/register.const';
import { ProductController } from './product.controller';

const router = Router();

router.post(
  '/create-product',
  auth(UserRole.user),
  ProductController.createProduct,
);
// get all product
router.get('/', ProductController.getAllProduct);
router.get('/my-product', auth('user'), ProductController.findMyProduct);
router.get('/:id', ProductController.getSingleProduct);
router.delete(
  '/my-product/:id',
  auth('user'),
  ProductController.deleteMyProduct,
);
router.patch(
  '/my-product/:id',
  auth(UserRole.user),
  ProductController.updateProduct,
);

export const product = router;
