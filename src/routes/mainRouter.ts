import { Router } from "express";

import userController from "../controller/userController";
import productController from "../controller/productController";
import blurhashController from "../controller/blurhashController";
import cartController from "../controller/cartController";
import categoryController from "../controller/categoryController";

//? endpoint /v1/....

const mainRouter = Router();

mainRouter.get("/account/:userName", userController.GETAddress);
mainRouter.get("/cart/:userName", cartController.GET);

mainRouter.post("/blurhash", blurhashController.getBlurhash);
mainRouter.post("/verification", userController.verify);

mainRouter.post("/cart", cartController.insertOne);
mainRouter.put("/cart", cartController.update);
mainRouter.delete("/cart", cartController.deleteOne);

mainRouter.post("/category", categoryController.GETCategory);
mainRouter.get("/category/:category", categoryController.GETProduct);

mainRouter.post("/register", userController.register);
mainRouter.post("/login", userController.login);

mainRouter.get("/product", productController.GETAll);
mainRouter.post("/product", productController.POST);
mainRouter.put("/product", productController.PUT);
mainRouter.delete("/product", productController.DELETE);

mainRouter.get("/:userName", userController.GETUserPage);

mainRouter.get("/:userName/:slugProduct", productController.GETProductDetail);

export { mainRouter };
