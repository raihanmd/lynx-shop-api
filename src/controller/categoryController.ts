import { Handler, NextFunction, Request, Response } from "express";
import categoryService from "../services/categoryService";
import { customResponse } from "../utils/customResponse";

const GETCategory: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getCategory();

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: categories }, res);
  } catch (err) {
    next(err);
  }
};

const GETProduct: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const products = await categoryService.getProduct(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: products }, res);
  } catch (err) {
    next(err);
  }
};

export default { GETCategory, GETProduct };
