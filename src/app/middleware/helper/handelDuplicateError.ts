/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';
export const handelDuplicateError = (err: any, res: Response) => {
  res.status(httpStatus.CONFLICT).json({
    success: false,
    message: err.message,
    err: err,
  });
};
