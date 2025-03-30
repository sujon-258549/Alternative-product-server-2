import { Request, Response } from 'express';
import catchAsync from '../utility/catchAsync';
import { orderServes } from './order.serves';
import httpStatus from 'http-status';
import sendSuccess from '../utility/send-success';
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await orderServes.createOrderIntoDB(
    data,
    // @ts-expect-error user
    req?.user,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Order create successfully',
    data: result,
  });
});

export const orderController = { createOrder };
