import { Router } from 'express';
import { addUser, getUsers, getUserById, updateUser, getUserByName, deleteUser } from '../controllers/userData.ts';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);

router.put('/updateUser/:id', updateUser);

router.post('/addUser', addUser);
router.post('/', getUserByName); // for query parameter;

router.delete('/deleteUser/:id', deleteUser)

export default router;
