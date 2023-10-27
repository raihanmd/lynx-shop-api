import { Handler, NextFunction, Request, Response } from "express";

import userService from "../services/userService.js";
import { customResponse } from "../utils/customResponse.js";

const register: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName } = await userService.register(req.body);

    return customResponse({ statusCode: 200, message: "User created", payload: { userName } }, res);
  } catch (err) {
    next(err);
  }
};

const login: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName } = await userService.login(req.body);

    return customResponse({ statusCode: 200, message: "Login success", payload: { userName } }, res);
  } catch (err) {
    next(err);
  }
};

const getUserPage: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getUserPage(req.params);

    return customResponse({ statusCode: 200, message: "Login success", payload: response }, res);
  } catch (err) {
    next(err);
  }
};

export default { register, login, getUserPage };
