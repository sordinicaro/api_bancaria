
import express, { json } from "express";
import { logRequest } from './middlewares/requests-logger';
import mainRouter from "./routes";
import { handler404Error } from "./middlewares/wrong-uri-handler";

const app = express();

app.use(json());
app.use(logRequest);

app.use("/v1/api", mainRouter);

app.use("*", handler404Error);

export default app;