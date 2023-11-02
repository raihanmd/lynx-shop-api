import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse";
import cartService from "../services/cartService";

const GET: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const cartUser = await cartService.get(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: cartUser }, res);
  } catch (err) {
    next(err);
  }
};

const POST: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await cartService.insertOne(req.body);

    return customResponse({ statusCode: 200, message: "Cart added successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const PUT: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await cartService.update(req.body);

    return customResponse({ statusCode: 200, message: "Cart updated successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const DELETE: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await cartService.deleteOne(req.body);

    return customResponse({ statusCode: 200, message: "Cart deleted successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

export default { GET, POST, PUT, DELETE };
