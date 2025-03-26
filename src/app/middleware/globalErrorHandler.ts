/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { handelGenericError } from './helper/handelGenericError';
import { handelDuplicateError } from './helper/handelDuplicateError';
import { handelCastError } from './helper/handelCastError';
import { handelValidationError } from './helper/handelValidationError';
// type error .................................................................
// generic error
// Duplicate error
// Validation error
// zod error
// cast error

type TErrorResponse = {
  success: boolean;
  message: string;
  err: any;
};
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // cast error
  if (err instanceof mongoose.Error.CastError) {
    handelCastError(err, res);
  } else if (err.code && err.code === 11000) {
    //duplicate error
    handelDuplicateError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handelValidationError(err, res);
  } else if (err instanceof Error) {
    //generic Error
    handelGenericError(err, res);
  }
};
