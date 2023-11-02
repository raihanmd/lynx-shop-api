import { Handler, NextFunction, Request, Response } from "express";
import orderService from "../services/orderService";
import { customResponse } from "../utils/customResponse";

const GET: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const cartUser = await orderService.get(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: cartUser }, res);
  } catch (err) {
    next(err);
  }
};

const POST: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await orderService.insertOne(req.body);

    return customResponse({ statusCode: 200, message: "Order added successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const checkout: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await orderService.checkout(req.body);

    return customResponse({ statusCode: 200, message: "Checkout succeed.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

export default { GET, POST, checkout };
