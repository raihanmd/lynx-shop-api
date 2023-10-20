import { Router } from "express";
import userController from "../controller/userController.js";

const publicRouter = Router();
publicRouter.post("/api/register", userController.register);
publicRouter.post("/api/login", userController.login);

export { publicRouter };
