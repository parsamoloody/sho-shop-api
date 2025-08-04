import { Router } from 'express';
import { addProduct, editProduct, getAllProducts, getProductById } from '../controllers/product.controller';

const router = Router();

router.post('/create', addProduct);
router.put('/edit/:id', editProduct);
router.get('/get-all', getAllProducts);
router.get('/get-one/:id', getProductById)

export default router;