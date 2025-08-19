import { Router } from 'express';
import { categoryController } from '../factory/resolveFactory';

const categoryReadRouter = Router();
const categoryManualRouter = Router();

categoryReadRouter.get('/get-all', categoryController.getAll);
categoryReadRouter.get('/get-one/:id', categoryController.getOne);
categoryManualRouter.post('/create', categoryController.create);
categoryManualRouter.patch('/edit/:id', categoryController.update);
export { categoryReadRouter, categoryManualRouter };