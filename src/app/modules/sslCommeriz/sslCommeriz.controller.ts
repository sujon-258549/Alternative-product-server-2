import { Request, Response } from 'express';
import catchAsync from '../utility/catchAsync';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';
import { sslServices } from './sslCommeriz.servises';
import config from '../../config';
const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const tran_id = req.query.tran_id as string;
  const result = await sslServices.validatePaymentService(tran_id);
  console.log(result);

  if (result) {
    res.redirect(301, config.SUCCESS_URL as string);
  } else {
    res.redirect(301, config.FAIL_URL as string);
  }
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Payment  successfully',
    data: result,
  });
});

export const sslController = { validatePayment };
