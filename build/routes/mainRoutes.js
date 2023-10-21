import { Router } from "express";
import userController from "../controller/userController.js";
const router = Router();
router.post("/api/register", userController.register);
router.post("/api/login", userController.login);
export { router };
