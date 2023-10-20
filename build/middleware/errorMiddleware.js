var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from "joi";
import { ServiceError } from "../error/serviceError.js";
import { errorResponse } from "../utils/errorResponse.js";
export const errorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!err) {
        return next();
    }
    if (err instanceof ServiceError) {
        return errorResponse({ statusCode: err.statusCode, error: err.message }, res);
    }
    else if (err instanceof Joi.ValidationError) {
        return errorResponse({ statusCode: 400, error: err.message }, res);
    }
    else {
        return errorResponse({ statusCode: 500, error: "Internal Server Error" }, res);
    }
});
