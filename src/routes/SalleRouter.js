import express from 'express';
import { bearerTokenHandler, userRoleHandler } from '../services/middleware/UserMiddleware.js';
import { SalleController } from '../controllers/index.js';

const salleRouter = express.Router();

salleRouter.get('/', bearerTokenHandler, SalleController.getAllrooms);
salleRouter.delete('/:id', bearerTokenHandler,userRoleHandler("ADMIN"), SalleController.deleteRoom);
salleRouter.post('/create', bearerTokenHandler, userRoleHandler("ADMIN"),SalleController.createRoom);
salleRouter.put('/:id', bearerTokenHandler, userRoleHandler("ADMIN"), SalleController.modifyRoom);

export default salleRouter;

