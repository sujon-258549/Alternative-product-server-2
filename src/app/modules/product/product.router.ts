import { NextFunction, Request, Response, Router } from 'express';
import { upload } from '../utility/uploadImageCloudinary';
import auth from '../utility/auth';
import { UserRole } from '../Auth/simpleAuth/register.const';
import { ProductController } from './product.controller';

const router = Router();

router.post(
  '/create-product',
  auth(UserRole.user),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  //   auth(UserRole.user),
  ProductController.createProduct,
);
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getAllProduct);
router.get('/my-product', auth('user'), ProductController.findMyProduct);
router.delete(
  '/my-product/:id',
  auth('user'),
  ProductController.deleteMyProduct,
);
router.patch(
  '/:id',
  auth(UserRole.user),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProductController.updateProduct,
);

export const product = router;
