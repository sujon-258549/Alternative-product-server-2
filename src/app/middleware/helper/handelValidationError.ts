/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';
export const handelValidationError = (err: any, res: Response) => {
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      path: item.path,
      message: item.message,
    };
  });
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: err.message,
    issues: issues,
    err: err,
  });
};
