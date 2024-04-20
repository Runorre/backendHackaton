import express from 'express';
import { EventController } from '../controllers/index.js';
import { bearerTokenHandler, userRoleHandler } from '../services/middleware/UserMiddleware.js';

const eventRouter = express.Router();

eventRouter.post('/create', bearerTokenHandler, EventController.bookRoom);
eventRouter.post('/create-periodical', bearerTokenHandler, EventController.bookPeriodicalRoom);
eventRouter.delete('/:id', bearerTokenHandler, EventController.removeEvent);
eventRouter.delete('admin/:id', bearerTokenHandler, userRoleHandler("ADMIN"), EventController.removeEventAdmin); // admin
eventRouter.get('/', bearerTokenHandler, EventController.getConfirmedEvents);
eventRouter.put('/:id', bearerTokenHandler, EventController.modifyUserEvent);
eventRouter.put('/admin/:id', bearerTokenHandler, userRoleHandler("ADMIN"), EventController.modifyAdminEvent); // admin
eventRouter.get('/admin', bearerTokenHandler, userRoleHandler("ADMIN"), EventController.confirmEvent); // admin
eventRouter.get('/register', bearerTokenHandler, EventController.registerEvent);
eventRouter.get('/invite', bearerTokenHandler, EventController.inviteEvent);
eventRouter.get('/admin/invite', bearerTokenHandler, userRoleHandler("ADMIN"), EventController.inviteEventAdmin); // admin
eventRouter.put('/admin/confirm', bearerTokenHandler, userRoleHandler("ADMIN"), EventController.confirmEvent); // admin


export default eventRouter;

