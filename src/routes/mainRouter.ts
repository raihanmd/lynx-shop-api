import { Router } from "express";

import userController from "../controller/userController";
import productController from "../controller/productController";
import blurhashController from "../controller/blurhashController";
import cartController from "../controller/cartController";
import categoryController from "../controller/categoryController";
import orderController from "../controller/orderController";
import firebaseController from "../controller/firebaseController";
import wishlistController from "../controller/wishlistController";
import reviewController from "../controller/reviewController";
import rajaongkirController from "../controller/rajaongkirController";

// ? endpoint /v1/....

const mainRouter = Router();

mainRouter.post("/blurhash", blurhashController.POST);

mainRouter.post("/image", firebaseController.uploadImage);

mainRouter.post("/wishlist", wishlistController.POST);
mainRouter.delete("/wishlist", wishlistController.DELETE);
mainRouter.get("/wishlist/:userName", wishlistController.GET);

mainRouter.post("/cart", cartController.POST);
mainRouter.put("/cart", cartController.PUT);
mainRouter.delete("/cart", cartController.DELETE);
mainRouter.get("/cart/:userName", cartController.GET);

mainRouter.get("/category", categoryController.GETCategory);
mainRouter.get("/category/:category", categoryController.GETProduct);

mainRouter.post("/checkout", orderController.checkout);
mainRouter.post("/order", orderController.POST);
mainRouter.get("/order/:userName", orderController.GET);

mainRouter.post("/cost", rajaongkirController.POSTGetCost);
mainRouter.get("/province", rajaongkirController.GETProvinces);
mainRouter.get("/city/:provinceId", rajaongkirController.GETCities);

mainRouter.post("/register", userController.register);
mainRouter.post("/login", userController.login);

mainRouter.post("/review", reviewController.POST);
mainRouter.put("/review", reviewController.PUT);
mainRouter.get("/review/:productId", reviewController.GET);

mainRouter.get("/product", productController.GETAll);
mainRouter.post("/product", productController.POST);
mainRouter.put("/product", productController.PUT);
mainRouter.delete("/product", productController.DELETE);

mainRouter.get("/account/:userName", userController.GETAddress);
mainRouter.post("/verification", userController.verify);
mainRouter.get("/:userName", userController.GETUserPage);

mainRouter.get("/:userName/:slugProduct", productController.GETProductDetail);

export { mainRouter };
