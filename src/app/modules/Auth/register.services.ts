import AppError from '../../error/appError';
import { TLogin, TRegister } from './register.interface';
import { User } from './register.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
const createUserIntoDB = async (payload: TRegister) => {
  const result = await User.create(payload);
  return result;
};
const loginUserIntoDB = async (payload: TLogin) => {
  const existUser = await User.findOne({ email: payload.email });
  if (!existUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorize');
  }
  const comparePassword = await bcrypt.compare(
    payload.password,
    existUser.password,
  );
  if (!comparePassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorize');
  }
  console.log(comparePassword);
};

export const UserServices = { createUserIntoDB, loginUserIntoDB };
