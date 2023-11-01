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
exports.errorMiddleware = void 0;
//@ts-ignore
const joi_1 = __importDefault(require("joi"));
const serviceError_1 = require("../error/serviceError");
const errorResponse_1 = require("../utils/errorResponse");
const databaseError_1 = require("../error/databaseError");
const errorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!err) {
        return next();
    }
    if (err instanceof serviceError_1.ServiceError) {
        return (0, errorResponse_1.errorResponse)({ statusCode: err.statusCode, error: err.message }, res);
    }
    else if (err instanceof databaseError_1.DatabaseError) {
        return (0, errorResponse_1.errorResponse)({ statusCode: 403, error: err.message }, res);
    }
    else if (err instanceof joi_1.default.ValidationError) {
        return (0, errorResponse_1.errorResponse)({ statusCode: 400, error: err.message }, res);
    }
    else {
        return (0, errorResponse_1.errorResponse)({ statusCode: 500, error: "Internal Server Error" }, res);
    }
});
exports.errorMiddleware = errorMiddleware;
