import { Response } from "express";

interface IResponse {
  statusCode: number;
  error: string;
}

export const errorResponse = ({ statusCode, error }: IResponse, res: Response): Response => {
  return res.status(statusCode).json({
    statusCode,
    error,
  });
};
