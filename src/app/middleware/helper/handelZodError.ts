/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const handelZodError = (err: any, res: Response) => {
  const issues = err.issues.map((item: any) => {
    return {
      path: item.path.join(' '),
      message: item,
    };
  });
  res.status(400).json({
    success: false,
    message: err.message,
    issues: issues,
    err: err,
  });
};
