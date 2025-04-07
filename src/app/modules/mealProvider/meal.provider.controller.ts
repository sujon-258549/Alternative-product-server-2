import catchAsync from '../utility/catchAsync';
import httpStatus from 'http-status';
import { mealProviderServes } from './meal.provider.serves';
import sendSuccess from '../utility/send-success';
import { Request, Response } from 'express';
const createMealProvider = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data, req.file);
  //   const result = await mealProviderServes.CreateMealProviderIntoDB(
  //     data,
  //     // @ts-expect-error user
  //     req?.user,
  //   );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Meal Provider created successfully',
    data: null,
  });
});

export const mealProviderController = { createMealProvider };
