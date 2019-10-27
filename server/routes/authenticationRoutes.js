import express from 'express';
import { userController } from '../controllers/usersControllers';
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

export default router;