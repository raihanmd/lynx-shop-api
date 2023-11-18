import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse";
import wishlistService from "../services/wishlistService";

const GET: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const wishlistUser = await wishlistService.get(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: wishlistUser }, res);
  } catch (err) {
    next(err);
  }
};

const POST: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await wishlistService.insertOne(req.body);

    return customResponse({ statusCode: 200, message: "Wishlist added successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const DELETE: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await wishlistService.deleteOne(req.body);

    return customResponse({ statusCode: 200, message: "Wishlist deleted successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

export default { GET, POST, DELETE };
