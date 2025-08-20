import { Router } from 'express';
import { userController } from '../factory/resolveFactory';

const userManualRouter = Router();
const userReadRouter = Router();

userReadRouter.get('/get-all', userController.getAll);
userReadRouter.get('/get-one/:id', userController.getOne);
userManualRouter.put('/edit/:id', userController.update);
export { userManualRouter, userReadRouter };