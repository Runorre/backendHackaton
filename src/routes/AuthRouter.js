import express from 'express';
import { bearerTokenHandler, userRoleHandler } from '../services/middleware/UserMiddleware.js';
import { AuthController } from '../controllers/index.js';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);

export default authRouter;