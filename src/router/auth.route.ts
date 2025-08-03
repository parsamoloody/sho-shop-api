import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, me } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', [
  body('email').isString().notEmpty(),
  body('name').isString().notEmpty(),
  body('password').isString().isLength({ min: 5 })
], signup);

router.post('/login', login);
router.get('/me', authenticate, me);

export default router;
