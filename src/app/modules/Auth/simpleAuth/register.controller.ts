import { Request, Response } from 'express';
import catchAsync from '../../utility/catchAsync';
import { UserServices } from './register.services';
import sendSuccess from '../../utility/send-success';
import httpStatus from 'http-status';
import config from '../../../config';

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
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // @ts-expect-error user
  const user = req?.user;
  const result = await UserServices.updateUserIntoDB(data, user);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Update User successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserServices.loginUserIntoDB(data);
  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
  });
  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
  });
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User login successfully',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshTokenUseCreateSecretToken = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const { accessToken } =
      await UserServices.createRefreshTokenIntoDB(refreshToken);
    sendSuccess(res, {
      statuscode: httpStatus.CREATED,
      success: true,
      message: 'Create Access Token successfully',
      data: { accessToken },
    });
  },
);
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.forgetPassword(user);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Reset link is gangrened  successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserServices.resetPassword(data);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Password reset  successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  // @ts-expect-error user
  const token = req?.user;
  const result = await UserServices.changePassword(body, token);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Password change  successfully',
    data: result,
  });
});
const setImageIntoUser = catchAsync(async (req: Request, res: Response) => {
  const file = req?.file;
  // @ts-expect-error user
  const token = req?.user;
  const result = await UserServices.setImageIntoUser(file, token);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Image change  successfully',
    data: result,
  });
});
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB(req.query);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'All user retrieved   successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getMe = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const token = req?.user;
  const result = await UserServices.getMeFromDB(token);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'My date retrieved   successfully',
    data: result,
  });
});
export const UserController = {
  CreateUser,
  loginUser,
  refreshTokenUseCreateSecretToken,
  forgetPassword,
  resetPassword,
  changePassword,
  setImageIntoUser,
  getMe,
  updateUser,
  getAllUser,
};
