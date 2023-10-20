import { Response, NextFunction, Request } from "express";

export const apiKeyMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(req);
};
