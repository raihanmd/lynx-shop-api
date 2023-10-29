"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidation = exports.registerUserValidation = void 0;
//@ts-ignore
const joi_1 = __importDefault(require("joi"));
exports.registerUserValidation = joi_1.default.object({
    userId: joi_1.default.string().max(14).optional(),
    userOAuthId: joi_1.default.string().max(100).required(),
    userEmail: joi_1.default.string().max(100).required(),
    userName: joi_1.default.string().max(100).required(),
    userProvider: joi_1.default.string().max(50).required(),
    userImage: joi_1.default.string().max(255).required(),
});
exports.loginUserValidation = joi_1.default.object({
    userOAuthId: joi_1.default.string().max(100).required(),
    userEmail: joi_1.default.string().max(100).required(),
    userProvider: joi_1.default.string().max(50).required(),
});
