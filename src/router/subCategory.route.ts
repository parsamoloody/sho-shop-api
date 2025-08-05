import { Router } from 'express';
import { subCategoryController } from '../factory/resolveFactory';

const router = Router();

router.get('/get-all', subCategoryController.getAll);
router.get('/get-one/:id', subCategoryController.getOne)
router.post('/create', subCategoryController.create);
router.patch('/edit/:id', subCategoryController.update);
export default router;