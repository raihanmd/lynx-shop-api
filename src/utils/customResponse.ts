import { Response } from "express";

interface IResponse {
  statusCode: number;
  payload: string | Array<object> | object;
  message: string;
}

export const customResponse = (
  { statusCode, message, payload }: IResponse,
  res: Response
): Response => {
  return res
    .set("Access-Control-Allow-Origin", "*")
    .set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    .set("Cache-Control", "public, max-age=300, stale-while-revalidate=59")
    .set("Content-Type", "application/json")
    .status(statusCode)
    .json({
      statusCode,
      payload,
      message,
    });
};
