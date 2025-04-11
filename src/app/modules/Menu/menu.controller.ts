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
const findAllMenu = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantServices.findAllMenuIntoDB(
    // @ts-expect-error user
    req?.user,
    req?.query,
  ); //
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'All Menu retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const findSingleMenu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await restaurantServices.findSingleMenu(id); //
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'One menu retrieved successfully',
    data: result,
  });
});
const findMyMenu = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantServices.findMyMenu(
    // @ts-expect-error user
    req?.user,
  ); //
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'My menu retrieved successfully',
    data: result,
  });
});
const updateMyMenu = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantServices.updateMyMenu(
    req.body,
    // @ts-expect-error user
    req?.user,
  ); //
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Update my menu successfully',
    data: result,
  });
});

export const restaurantController = {
  createMenuForDay,
  findAllMenu,
  findMyMenu,
  updateMyMenu,
  findSingleMenu,
};
