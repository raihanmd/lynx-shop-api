"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutOrderValidation = exports.POSTOrderValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.POSTOrderValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    productId: joi_1.default.string().max(14).required,
    productQuantity: joi_1.default.number().max(9999999999).required(),
});
exports.CheckoutOrderValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).required(),
    orderId: joi_1.default.string().max(14).required,
    checkoutAt: joi_1.default.number().max(9999999999).required(),
});
