/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../../middleware/error/appError';
import { TLogin, TRegister } from './register.interface';
import { User } from './register.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendImageCloudinary } from '../../utility/uploadImageCloudinary';
const createUserIntoDB = async (payload: TRegister, file: any) => {
  console.log({ file });
  const profileImage = await sendImageCloudinary(
    payload.phone.toString(),
    file?.path,
  );
  // @ts-expect-error url
  payload.profileImage = profileImage?.secure_url;
  const result = await User.create(payload);
  return result;
};
const loginUserIntoDB = async (payload: TLogin) => {
  console.log(payload);
  const existUser = await User.findOne({ email: payload.email });
  if (!existUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found.');
  }
  const comparePassword = await bcrypt.compare(
    payload.password,
    existUser.password,
  );
  if (!comparePassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password.');
  }

  const JwtPayload = {
    email: existUser.email,
    role: existUser.role,
    id: existUser._id,
  };
  const accessToken = createToken(
    // @ts-expect-error token
    JwtPayload,
    config.ACCESS_SECRET as string,
    config.ACCESS_EXPIRE_IN as string,
  );
  const refreshToken = createToken(
    // @ts-expect-error token
    JwtPayload,
    config.REFRESH_SECRET as string,
    config.REFRESH_EXPIRE_IN as string,
  );
  console.log({ accessToken, refreshToken });
  return {
    accessToken,
    refreshToken,
  };
};

const createRefreshTokenIntoDB = async (token: string) => {
  const { email } = jwt.verify(
    token,
    config.REFRESH_SECRET as string,
  ) as JwtPayload;

  const existUser = await User.findOne({ email: email });
  if (!existUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found.');
  }

  const JwtPayload = {
    email: existUser.email,
    role: existUser.role,
    id: existUser._id,
  };
  const accessToken = createToken(
    // @ts-expect-error token
    JwtPayload,
    config.ACCESS_SECRET as string,
    config.ACCESS_EXPIRE_IN as string,
  );
  return { accessToken };
};
const forgetPassword = async (email: number) => {
  console.log(email);
  const existEmail = await User.findOne({ email: email });
  if (!existEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found.');
  }

  const JwtPayload = {
    email: existEmail.email,
    role: existEmail.role,
    id: existEmail._id,
  };
  const accessToken = createToken(
    // @ts-expect-error token
    JwtPayload,
    config.ACCESS_SECRET as string,
    '10m',
  );

  const resetUrlLink = `http://localhost:3000?email=${existEmail?.email}&token=${accessToken}`;
  console.log(resetUrlLink);
};
export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  createRefreshTokenIntoDB,
  forgetPassword,
};
