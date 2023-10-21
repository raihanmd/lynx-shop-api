import { Response, NextFunction, Request, ErrorRequestHandler } from "express";
import Joi from "joi";

import { ServiceError } from "../error/serviceError.js";
import { errorResponse } from "../utils/errorResponse.js";
import { DatabaseError } from "../error/databaseError.js";

interface IErrorMiddleware extends ErrorRequestHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}

export const errorMiddleware: IErrorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }
  if (err instanceof ServiceError) {
    return errorResponse({ statusCode: err.statusCode, error: err.message }, res);
  } else if (err instanceof DatabaseError) {
    return errorResponse({ statusCode: 403, error: err.message }, res);
  } else if (err instanceof Joi.ValidationError) {
    return errorResponse({ statusCode: 400, error: err.message }, res);
  } else {
    return errorResponse({ statusCode: 500, error: "Internal Server Error" }, res);
  }
};
