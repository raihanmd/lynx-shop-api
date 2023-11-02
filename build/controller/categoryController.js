"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryService_1 = __importDefault(require("../services/categoryService"));
const customResponse_1 = require("../utils/customResponse");
const GETCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryService_1.default.getCategory();
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Data successfully retrieved.", payload: categories }, res);
    }
    catch (err) {
        next(err);
    }
});
const GETProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const products = yield categoryService_1.default.getProduct(req.params);
        return (0, customResponse_1.customResponse)({ statusCode: 200, message: "Data successfully retrieved.", payload: products }, res);
    }
    catch (err) {
        next(err);
    }
});
exports.default = { GETCategory, GETProduct };
