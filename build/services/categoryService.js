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
const categoryDatabase_1 = __importDefault(require("../database/category/categoryDatabase"));
const getCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryDatabase_1.default.getAll();
    //@ts-ignore
    return categories;
});
const getProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req;
    const products = yield categoryDatabase_1.default.getProduct(category.toLowerCase());
    //@ts-ignore
    return products;
});
exports.default = { getCategory, getProduct };
