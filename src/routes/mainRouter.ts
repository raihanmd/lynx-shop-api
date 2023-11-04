import { Router } from "express";

import userController from "../controller/userController";
import productController from "../controller/productController";
import blurhashController from "../controller/blurhashController";
import cartController from "../controller/cartController";
import categoryController from "../controller/categoryController";
import orderController from "../controller/orderController";

//? endpoint /v1/....

const mainRouter = Router();

mainRouter.get("/account/:userName", userController.GETAddress);
mainRouter.get("/cart/:userName", cartController.GET);

mainRouter.post("/blurhash", blurhashController.GET);

mainRouter.post("/verification", userController.verify);

mainRouter.post("/cart", cartController.POST);
mainRouter.put("/cart", cartController.PUT);
mainRouter.delete("/cart", cartController.DELETE);

mainRouter.get("/category", categoryController.GETCategory);
mainRouter.get("/category/:category", categoryController.GETProduct);

mainRouter.post("/checkout", orderController.checkout);

mainRouter.post("/order", orderController.POST);
mainRouter.get("/order/:userName", orderController.GET);

mainRouter.post("/register", userController.register);
mainRouter.post("/login", userController.login);

mainRouter.get("/product", productController.GETAll);
mainRouter.post("/product", productController.POST);
mainRouter.put("/product", productController.PUT);
mainRouter.delete("/product", productController.DELETE);

mainRouter.get("/:userName", userController.GETUserPage);

mainRouter.get("/:userName/:slugProduct", productController.GETProductDetail);

//! yang kurang /image /rajaongkir /review /wishlist

export { mainRouter };
