import { Router } from "express";

import userController from "../controller/userController.js";
import productController from "../controller/productController.js";
import blurhashController from "../controller/blurhashController.js";
import cartController from "../controller/cartController.js";

//? endpoint /v1/....

const mainRouter = Router();

mainRouter.get("/account/:userName", userController.GETAddress);
mainRouter.get("/cart/:userName", cartController.GET);

mainRouter.post("/blurhash", blurhashController.getBlurhash);

//!Belom beres
mainRouter.post("/cart", cartController.insertOne);
mainRouter.put("/cart", cartController.update);
mainRouter.delete("/cart", cartController.deleteOne);

mainRouter.post("/register", userController.register);
mainRouter.post("/login", userController.login);

mainRouter.get("/product", productController.GETAll);
mainRouter.post("/product", productController.POST);
mainRouter.put("/product", productController.PUT);
mainRouter.delete("/product", productController.DELETE);

mainRouter.get("/:userName", userController.GETUserPage);

mainRouter.get("/:userName/:slugProduct", productController.GETProductDetail);

export { mainRouter };
