import express, { Express } from "express";
import { publicRouter } from "../routes/publicRouter.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";

const app: Express = express();
app.use(express.json());
app.use(publicRouter);
app.use(errorMiddleware);

export { app };
