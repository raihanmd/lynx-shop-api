import { Handler, NextFunction, Request, Response } from "express";

import { customResponse } from "../utils/customResponse";
import userService from "../services/userService";

const verify: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.verify(req.body);

    return customResponse({ statusCode: 200, message: "User validation successfully, you now have Rp.1.000.000 free balance.", payload: response }, res);
  } catch (err) {
    next(err);
  }
};

const register: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.register(req.body);

    return customResponse({ statusCode: 200, message: "User created.", payload: response }, res);
  } catch (err) {
    next(err);
  }
};

const login: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.login(req.body);

    return customResponse({ statusCode: 200, message: "Login success.", payload: response }, res);
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

export default { verify, register, login, GETUserPage, GETAddress };
