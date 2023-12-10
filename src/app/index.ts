import express, { Express } from "express";
import cors from "cors";

import cacheControl from "../cahce/cahceControl";
import { mainRouter } from "../routes/mainRouter";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { APIKeyCheckMiddleware } from "../middleware/APIKeyCheckMiddleware";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(APIKeyCheckMiddleware);
app.use(cacheControl(300));
app.use("/v1", mainRouter);
app.use(errorMiddleware);

export { app };
