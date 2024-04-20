import express from 'express';
import authRouter from './AuthRouter.js';

// import { bearerTokenHandler, userRoleHandler } from '../services/middlewares/UserMiddleware.js';

const router = express.Router();

router.use('/auth', authRouter);

export default router;