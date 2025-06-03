import { Router } from 'express';
import { contactController } from './contactUs.controller';
import auth from '../utility/auth';

const router = Router();
router.post('/create-contact', auth('user'), contactController.createContact);

router.get('/c2', auth('user'), contactController.contactForMe2);
router.get('/contactForMe/:id', auth('user'), contactController.contactForMe);
router.get('/contactForHe/:id', auth('user'), contactController.contactForHe);
router.get('/', auth('user'), contactController.singleContact);
router.delete('/:id', auth('user'), contactController.deleteContact);

export const contactRouter = router;
