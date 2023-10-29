import express, { Express } from "express";

import cacheControl from "../cahce/cahceControl.ts";
import { mainRouter } from "../routes/mainRouter.ts";
import { errorMiddleware } from "../middleware/errorMiddleware.ts";
import { APIKeyCheckMiddleware } from "../middleware/APIKeyCheckMiddleware.ts";

const app: Express = express();
app.use(express.json());
app.use(APIKeyCheckMiddleware);
app.use(cacheControl(300));
app.use("/v1", mainRouter);
app.use(errorMiddleware);

export { app };
