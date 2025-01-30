import { Router } from 'express';
import { addUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userData.ts';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);

router.patch('/:id', updateUser);

router.post('/', addUser);

router.delete('/:id', deleteUser)

export default router;
