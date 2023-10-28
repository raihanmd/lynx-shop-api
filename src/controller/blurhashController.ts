import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse.js";
import blurhashService from "../services/blurhashService.js";

const getBlurhash: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blurahsh = await blurhashService.getBlurhash(req.body);

    return customResponse({ statusCode: 200, message: "User created", payload: blurahsh }, res);
  } catch (err) {
    next(err);
  }
};

export default { getBlurhash };