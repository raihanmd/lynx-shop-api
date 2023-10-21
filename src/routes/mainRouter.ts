import { Router } from "express";
import userController from "../controller/userController.js";
import productController from "../controller/productController.js";

const mainRouter = Router();
mainRouter.post("/api/register", userController.register);
mainRouter.post("/api/login", userController.login);

mainRouter.get("/api/products", productController.getAll);
mainRouter.post("/api/products", productController.getAll);

export { mainRouter };
