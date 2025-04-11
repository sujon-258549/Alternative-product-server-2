import { Request, Response } from 'express';
import catchAsync from '../utility/catchAsync';
import sendSuccess from '../utility/send-success';
import { restaurantServices } from './menu.services';
import httpStatus from 'http-status';
const createMenuForDay = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await restaurantServices.createMenuForDayIntoDB(
    data,
    // @ts-expect-error user
    req?.user,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Menu Create successfully',
    data: result,
  });
});
const findMyMenu = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantServices.findMyMenuForDayIntoDB(
    // @ts-expect-error user
    req?.user,
    req?.query,
  ); //
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'My Menu retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const restaurantController = { createMenuForDay, findMyMenu };
