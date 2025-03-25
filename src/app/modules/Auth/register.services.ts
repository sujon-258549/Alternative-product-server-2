import AppError from '../../middleware/error/appError';
import { TLogin, TRegister } from './register.interface';
import { User } from './register.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
const createUserIntoDB = async (payload: TRegister) => {
  const result = await User.create(payload);
  return result;
};
const loginUserIntoDB = async (payload: TLogin) => {
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
export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  createRefreshTokenIntoDB,
};
