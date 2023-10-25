var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import productService from "../services/productService.js";
import { customResponse } from "../utils/customResponse.js";
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.getAll();
        return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: products }, res);
    }
    catch (err) {
        next(err);
    }
});
const insertOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSucceed = yield productService.insertOne(req.body);
        return customResponse({ statusCode: 200, message: "Product added successfully.", payload: isSucceed }, res);
    }
    catch (err) {
        next(err);
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSucceed = yield productService.update(req.body);
        return customResponse({ statusCode: 200, message: "Product updated successfully.", payload: isSucceed }, res);
    }
    catch (err) {
        next(err);
    }
});
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSucceed = yield productService.deleteOne(req.body);
        return customResponse({ statusCode: 200, message: "Product updated successfully.", payload: isSucceed }, res);
    }
    catch (err) {
        next(err);
    }
});
export default { getAll, insertOne, update, deleteOne };
