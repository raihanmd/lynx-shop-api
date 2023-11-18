"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const productController_1 = __importDefault(require("../controller/productController"));
const blurhashController_1 = __importDefault(require("../controller/blurhashController"));
const cartController_1 = __importDefault(require("../controller/cartController"));
const categoryController_1 = __importDefault(require("../controller/categoryController"));
const orderController_1 = __importDefault(require("../controller/orderController"));
const firebaseController_1 = __importDefault(require("../controller/firebaseController"));
const wishlistController_1 = __importDefault(require("../controller/wishlistController"));
const reviewController_1 = __importDefault(require("../controller/reviewController"));
// ? endpoint /v1/....
const mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
mainRouter.get("/account/:userName", userController_1.default.GETAddress);
mainRouter.get("/cart/:userName", cartController_1.default.GET);
mainRouter.get("/wishlist/:userName", wishlistController_1.default.GET);
mainRouter.get("/review/:productId", reviewController_1.default.GET);
mainRouter.get("/blurhash", blurhashController_1.default.GET);
mainRouter.post("/image", firebaseController_1.default.uploadImage);
mainRouter.post("/verification", userController_1.default.verify);
mainRouter.post("/wishlist", wishlistController_1.default.POST);
mainRouter.delete("/wishlist", wishlistController_1.default.DELETE);
mainRouter.post("/cart", cartController_1.default.POST);
mainRouter.put("/cart", cartController_1.default.PUT);
mainRouter.delete("/cart", cartController_1.default.DELETE);
mainRouter.get("/category", categoryController_1.default.GETCategory);
mainRouter.get("/category/:category", categoryController_1.default.GETProduct);
mainRouter.post("/checkout", orderController_1.default.checkout);
mainRouter.post("/order", orderController_1.default.POST);
mainRouter.get("/order/:userName", orderController_1.default.GET);
mainRouter.post("/register", userController_1.default.register);
mainRouter.post("/login", userController_1.default.login);
mainRouter.post("/review", reviewController_1.default.POST);
mainRouter.put("/review", reviewController_1.default.PUT);
mainRouter.get("/product", productController_1.default.GETAll);
mainRouter.post("/product", productController_1.default.POST);
mainRouter.put("/product", productController_1.default.PUT);
mainRouter.delete("/product", productController_1.default.DELETE);
mainRouter.get("/:userName", userController_1.default.GETUserPage);
mainRouter.get("/:userName/:slugProduct", productController_1.default.GETProductDetail);
