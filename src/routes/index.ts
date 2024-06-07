import { Router } from "express";
import userRouter from "./user";
import { handler405Error } from "../middlewares/wrong-method-handler ";
import ServerController from "../controllers/server";

const mainRouter = Router();

mainRouter.get("/status", ServerController.getStatus);

mainRouter.use('/users', userRouter);

mainRouter.all('/status', handler405Error);

export default mainRouter;

