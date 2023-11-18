import { Handler, NextFunction, Request, Response } from "express";

import rajaongkirService from "../services/rajaongkirService";
import { customResponse } from "../utils/customResponse";

const GETProvinces: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provinces = await rajaongkirService.getProvinces(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: provinces }, res);
  } catch (err) {
    next(err);
  }
};

const GETCities: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cityId = await rajaongkirService.getCities(req.params);

    return customResponse({ statusCode: 200, message: "Data successfully retrieved.", payload: cityId }, res);
  } catch (err) {
    next(err);
  }
};

const POSTGetCost: Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const costs = await rajaongkirService.getCost(req.body);

    return customResponse({ statusCode: 200, message: "Product added successfully.", payload: costs }, res);
  } catch (err) {
    next(err);
  }
};

export default { POSTGetCost, GETCities, GETProvinces };
