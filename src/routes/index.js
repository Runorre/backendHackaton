import express from 'express';
import authRouter from './AuthRouter.js';
import salleRouter from './SalleRouter.js';
import eventRouter from './EventRouter.js';
import userRouter from './UserRouter.js';

// import { bearerTokenHandler, userRoleHandler } from '../services/middlewares/UserMiddleware.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/room', salleRouter);
router.use('/event', eventRouter);
router.use('/user', userRouter);


export default router;