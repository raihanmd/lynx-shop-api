import { Response, NextFunction, Request } from "express";
import { errorResponse } from "../utils/errorResponse.js";

export const APIKeyCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "POST" && req.get("API-Key") !== process.env.API_KEY) {
    return errorResponse({ statusCode: 400, error: "Guest can't do the POST request." }, res);
  } else {
    next();
  }
};
