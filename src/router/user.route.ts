import { Router } from 'express';
import { editUser, getAllUsers, getUserById } from '../controllers/users.controller';
import { userController } from '../factory/resolveFactory';

const router = Router();

router.get('/get-all', userController.getAll);
router.get('/get-one/:id', getUserById)
router.patch('/edit/:id', editUser);
export default router;