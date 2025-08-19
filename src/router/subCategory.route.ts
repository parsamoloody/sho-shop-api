import { Router } from 'express';
import { subCategoryController } from '../factory/resolveFactory';

const subCategoryReadRouter = Router();
const subCategoryManualRouter = Router();

subCategoryReadRouter.get('/get-all', subCategoryController.getAll);
subCategoryReadRouter.get('/get-one/:id', subCategoryController.getOne)
subCategoryManualRouter.post('/create', subCategoryController.create);
subCategoryManualRouter.patch('/edit/:id', subCategoryController.update);
export { subCategoryReadRouter, subCategoryManualRouter };