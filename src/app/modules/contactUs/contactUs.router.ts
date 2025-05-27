import { Router } from 'express';
import { contactController } from './contactUs.controller';
import auth from '../utility/auth';

const router = Router();
router.post(
  '/create-contact',

  contactController.createContact,
);

router.get('/c2', auth('user'), contactController.contactForMe2);
router.get('/', auth('user'), contactController.contactForMe);
router.get('/:id', auth('user'), contactController.singleContact);

export const contactRouter = router;
