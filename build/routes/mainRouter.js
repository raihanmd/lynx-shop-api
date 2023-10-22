import { Router } from "express";
import userController from "../controller/userController.js";
import productController from "../controller/productController.js";
//? endpoint /v1/....
const mainRouter = Router();
mainRouter.post("/register", userController.register);
mainRouter.post("/login", userController.login);
mainRouter.get("/product", productController.getAll);
mainRouter.post("/product", productController.insertOne);
export { mainRouter };
