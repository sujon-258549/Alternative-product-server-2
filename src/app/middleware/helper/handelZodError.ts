import { Response } from 'express';

export const handelZodError = (err: any, res: Response) => {
  const issuse = err.issues.map((item: any) => {
    return {
      path: item.path.join(' '),
      message: item,
    };
    res.status(400).json({
      success: false,
    });
  });
};
