import { Request, Response } from 'express';
import catchAsync from '../../utility/catchAsync';
import { sosalAuthServices } from './sosalauth.servises';
import sendSuccess from '../../utility/send-success';
import httpStatus from 'http-status';
const createAuthLogin = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  const result = await sosalAuthServices.createSosalUserIntoDB(data);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Sosal Login successfully',
    data: result,
  });
});

export const sosalAuthController = { createAuthLogin };
