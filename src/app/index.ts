import express, { Express } from "express";

import cacheControl from "../cahce/cahceControl.js";
import { mainRouter } from "../routes/mainRouter.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { APIKeyCheckMiddleware } from "../middleware/APIKeyCheckMiddleware.js";

const app: Express = express();
app.use(express.json());
app.use(APIKeyCheckMiddleware);
app.use(cacheControl(300));
app.use(mainRouter);
app.use(errorMiddleware);

export { app };
