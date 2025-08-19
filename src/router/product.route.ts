import { Router } from 'express';
import { productController } from '../factory/resolveFactory';

const productReadRouter = Router();
const productManualRouter = Router();

productManualRouter.post('/', productController.create);
productManualRouter.put('/edit/:id', productController.update);
productReadRouter.get('/get-all', productController.getAll);
productReadRouter.get('/get-one/:id', productController.getOne);

export { productManualRouter, productReadRouter };