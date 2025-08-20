import { Router } from 'express';
import { wishController } from '../factory/resolveFactory';

const wishManualRouter = Router();
const wishListReadRouter = Router();

wishListReadRouter.get('/get-all', wishController.getAll);
wishListReadRouter.get('/get-one/:id', wishController.getOne);
wishManualRouter.put('/edit/:id', wishController.update);
export { wishManualRouter, wishListReadRouter };