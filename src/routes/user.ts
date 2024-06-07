import { Router } from "express";
import UserController from "../controllers/user";
import MovementController from "../controllers/movement";
import { authorizeUser } from "../middlewares/token-validator";
import { handler405Error } from "../middlewares/wrong-method-handler ";


const userRouter = Router();

userRouter.post('/', UserController.createNew);
userRouter.post('/auth/token', UserController.login);

userRouter.get('/me', authorizeUser, UserController.getInfo);

userRouter.get('/me/movements', authorizeUser, MovementController.getAll);

userRouter.post('/me/movements', authorizeUser, MovementController.createNew);

userRouter.all('/', handler405Error);
userRouter.all('/auth/token', handler405Error);
userRouter.all('/me', handler405Error);
userRouter.all('/me/movements', handler405Error);

export default userRouter;