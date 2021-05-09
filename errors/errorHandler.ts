import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import HttpException from "./HttpException";

export const pageNotFound = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const error = new createError.NotFound();
  next(error);
};

export const errorHandler = async (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
};
