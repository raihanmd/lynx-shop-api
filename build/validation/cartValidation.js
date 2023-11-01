"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETECartValidation = exports.PUTCartValidation = exports.POSTCartValidation = void 0;
//@ts-ignore
const joi_1 = __importDefault(require("joi"));
exports.POSTCartValidation = joi_1.default.object({
    cartId: joi_1.default.string().max(14).optional(),
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
    productQuantity: joi_1.default.number().max(9999999999).required(),
});
exports.PUTCartValidation = joi_1.default.object({
    cartId: joi_1.default.string().max(14).required(),
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required(),
    productQuantity: joi_1.default.number().max(9999999999).required(),
});
exports.DELETECartValidation = joi_1.default.object({
    cartId: joi_1.default.string().max(14).required(),
    userId: joi_1.default.string().max(14).required(),
});
