import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse";
import productService from "../services/productService";

const GETAll: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getAll();

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: products }, res);
  } catch (err) {
    next(err);
  }
};

const POST: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await productService.insertOne(req.body);

    return customResponse({ statusCode: 200, message: "Product added successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const PUT: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await productService.update(req.body);

    return customResponse({ statusCode: 200, message: "Product updated successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const DELETE: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await productService.deleteOne(req.body);

    return customResponse({ statusCode: 200, message: "Product deleted successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const GETProductDetail: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detailProduct = await productService.getDetail(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: detailProduct }, res);
  } catch (err) {
    next(err);
  }
};

export default { GETAll, POST, PUT, DELETE, GETProductDetail };
