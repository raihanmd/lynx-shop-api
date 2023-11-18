"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COSTRajaongkirValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.COSTRajaongkirValidation = joi_1.default.object({
    origin: joi_1.default.string().required(),
    destination: joi_1.default.string().required(),
    weight: joi_1.default.number().required(),
});
