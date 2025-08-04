import { Router } from 'express';
import { editUser, getAllUsers, getUserById } from '../controllers/users.controller';

const router = Router();

router.get('/get-all', getAllUsers);
router.get('/get-one/:id', getUserById)
router.patch('/edit/:id', editUser);
export default router;