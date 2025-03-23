import { Request, Response } from 'express';
import catchAsync from '../utility/catchAsync';
import { UserServices } from './register.services';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';

const CreateUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserServices.createUserIntoDB(data);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User Registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserServices.loginUserIntoDB(data);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

export const UserController = { CreateUser, loginUser };
