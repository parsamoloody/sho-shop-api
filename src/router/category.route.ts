import { Router } from 'express';
import { categoryController } from '../factory/resolveFactory';

const router = Router();

router.get('/get-all', categoryController.getAll);
router.get('/get-one/:id', categoryController.getOne)
router.post('/create', categoryController.create)
router.patch('/edit/:id', categoryController.update);
export default router;