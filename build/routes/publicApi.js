import { Router } from "express";
import userController from "../controller/userController.js";
export const publicRouter = Router();
publicRouter.post("/api/user", userController.register);
