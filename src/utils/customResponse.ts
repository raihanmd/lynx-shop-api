import { Response } from "express";

interface IResponse {
  statusCode: number;
  payload: string | Array<object> | object;
  message: string;
}

export const customResponse = ({ statusCode, message, payload }: IResponse, res: Response): Response => {
  return res.status(statusCode).json({
    statusCode,
    payload,
    message,
  });
};
