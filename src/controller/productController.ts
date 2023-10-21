import { Handler, NextFunction, Request, Response } from "express";

import productService from "../services/productService.js";
import { customResponse } from "../utils/customResponse.js";

const getAll: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getAll();

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: products }, res);
  } catch (err) {
    next(err);
  }
};

export default { getAll };
