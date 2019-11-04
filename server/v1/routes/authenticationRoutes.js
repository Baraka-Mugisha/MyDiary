import express from 'express';
import { userController } from '../controllers/usersControllers';
import validate from '../middlewares/validation';
const router = express.Router();

router.post('/signup', validate.ValidateSignUp, userController.signUp);
router.post('/signin', validate.ValidateSignIn, userController.signIn);

export default router;