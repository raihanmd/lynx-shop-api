import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse";
import reviewService from "../services/reviewService";

const GET: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const productReview = await reviewService.get(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: productReview }, res);
  } catch (err) {
    next(err);
  }
};

const POST: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await reviewService.insertOne(req.body);

    return customResponse({ statusCode: 200, message: "Review added successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

const PUT: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSucceed = await reviewService.updateOne(req.body);

    return customResponse({ statusCode: 200, message: "Review updated successfully.", payload: isSucceed }, res);
  } catch (err) {
    next(err);
  }
};

export default { GET, POST, PUT };
