import { Handler, NextFunction, Request, Response } from "express";

import userService from "../services/userService.js";
import { customResponse } from "../utils/customResponse.js";

const register: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = await userService.register(req.body);

    return customResponse({ statusCode: 200, message: "User created", payload: { username } }, res);
  } catch (err) {
    next(err);
  }
};

const login: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = await userService.login(req.body);

    return customResponse({ statusCode: 200, message: "Login success", payload: { username } }, res);
  } catch (err) {
    next(err);
  }
};

export default { register, login };
