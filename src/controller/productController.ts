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

const insertOne: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await productService.insertOne(req.body);

    return customResponse({ statusCode: 200, message: "Product added successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const update: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await productService.update(req.body);

    return customResponse({ statusCode: 200, message: "Product updated successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const deleteOne: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await productService.deleteOne(req.body);

    return customResponse({ statusCode: 200, message: "Product updated successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

export default { getAll, insertOne, update };
