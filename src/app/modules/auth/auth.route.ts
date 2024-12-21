import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { authControllers } from './auth.controller';

const router = Router();

router
  .route('/register')
  .post(
    validateRequest(userValidations.userValidationSchema),
    authControllers.registerUser,
  );

router
  .route('/login')
  .post(
    validateRequest(userValidations.loginValidationSchema),
    authControllers.loginUser,
  );

export const authRoutes = router;
