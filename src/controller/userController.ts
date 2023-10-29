import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse";
import userService from "../services/userService";

const register: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName } = await userService.register(req.body);

    return customResponse({ statusCode: 200, message: "User created.", payload: { userName } }, res);
  } catch (err) {
    next(err);
  }
};

const login: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName } = await userService.login(req.body);

    return customResponse({ statusCode: 200, message: "Login success.", payload: { userName } }, res);
  } catch (err) {
    next(err);
  }
};

const GETUserPage: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getUserPage(req.params);

    return customResponse({ statusCode: 200, message: "Data retrivied successfully.", payload: response }, res);
  } catch (err) {
    next(err);
  }
};

const GETAddress: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getAddress(req.params);

    return customResponse({ statusCode: 200, message: "Data retrivied successfully.", payload: response }, res);
  } catch (err) {
    next(err);
  }
};

export default { register, login, GETUserPage, GETAddress };
