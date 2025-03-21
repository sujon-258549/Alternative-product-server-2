import { Response } from 'express';
type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

interface TSent<T> {
  statuscode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data?: T;
}

const sendSuccess = <T>(res: Response, data: TSent<T>) => {
  res.status(data.statuscode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendSuccess;
