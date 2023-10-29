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
//? endpoint /v1/....
const mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
mainRouter.get("/account/:userName", userController_1.default.GETAddress);
mainRouter.get("/cart/:userName", cartController_1.default.GET);
mainRouter.post("/blurhash", blurhashController_1.default.getBlurhash);
//!Belom beres
mainRouter.post("/cart", cartController_1.default.insertOne);
mainRouter.put("/cart", cartController_1.default.update);
mainRouter.delete("/cart", cartController_1.default.deleteOne);
mainRouter.post("/register", userController_1.default.register);
mainRouter.post("/login", userController_1.default.login);
mainRouter.get("/product", productController_1.default.GETAll);
mainRouter.post("/product", productController_1.default.POST);
mainRouter.put("/product", productController_1.default.PUT);
mainRouter.delete("/product", productController_1.default.DELETE);
mainRouter.get("/:userName", userController_1.default.GETUserPage);
mainRouter.get("/:userName/:slugProduct", productController_1.default.GETProductDetail);
