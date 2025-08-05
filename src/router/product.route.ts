import { Router } from 'express';
import { productController } from '../factory/resolveFactory';

const router = Router();

router.post('/create', productController.create);
router.put('/edit/:id', productController.update);
router.get('/get-all', productController.getAll);
router.get('/get-one/:id', productController.getOne)

export default router;