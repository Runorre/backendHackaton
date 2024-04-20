import express from 'express';
import { bearerTokenHandler, userRoleHandler } from '../services/middleware/UserMiddleware.js';
import { UserController } from '../controllers/index.js';

const UserRouter = express.Router();

UserRouter.get('/all', bearerTokenHandler, userRoleHandler("ADMIN"), UserController.getAllUser);
UserRouter.get('/', bearerTokenHandler, UserController.getUser);
UserRouter.put('/', bearerTokenHandler, UserController.modifyUserHimself);
UserRouter.put('/:id', bearerTokenHandler, userRoleHandler("ADMIN"), UserController.modifyUser);
UserRouter.delete("/:id", bearerTokenHandler, userRoleHandler("ADMIN"), UserController.deleteUser);
UserRouter.get('/toAdmin/:id', bearerTokenHandler, userRoleHandler("ADMIN"), UserController.changeToAdmin);

export default UserRouter;
