import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse";
import firebaseService from "../services/firebaseService";

const uploadImage: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageUrl = await firebaseService.uploadImage(req.body);

    return customResponse({ statusCode: 200, message: "Image uploaded to firebase.", payload: imageUrl }, res);
  } catch (err) {
    next(err);
  }
};

export default { uploadImage };
