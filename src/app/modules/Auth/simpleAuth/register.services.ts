/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../../middleware/error/appError';
import { TLogin, TRegister } from './register.interface';
import { User } from './register.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utility/sendEmail';
import { sendImageToCloudinary } from '../../utility/uploadImageCloudinary';
// create user
const createUserIntoDB = async (payload: TRegister) => {
  const result = await User.create(payload);
  return result;
};

const updateUserIntoDB = async (
  payload: Partial<TRegister>,
  user: JwtPayload,
) => {
  const existUser = await User.findOne({ email: user.email });
  if (!existUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found.');
  }
  const result = await User.findOneAndUpdate(
    { email: existUser.email },
    payload,
    { new: true },
  );
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
    Id: existUser._id,
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
    Id: existUser._id,
  };
  const accessToken = createToken(
    // @ts-expect-error token
    JwtPayload,
    config.ACCESS_SECRET as string,
    config.ACCESS_EXPIRE_IN as string,
  );
  return { accessToken };
};
const forgetPassword = async (email: string) => {
  const existEmail = await User.findOne({ email: email });
  if (!existEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found.');
  }

  const JwtPayload = {
    email: existEmail.email,
    role: existEmail.role,
    Id: existEmail._id,
  };
  const accessToken = createToken(
    // @ts-expect-error token
    JwtPayload,
    config.ACCESS_SECRET as string,
    '10m',
  );

  const resetUrlLink = `${config.RESET_UI_LINK}?email=${existEmail?.email}&token=${accessToken}`;
  sendEmail(existEmail.email, resetUrlLink);
};
const resetPassword = async (
  payload: any,
  data: { newPassword: string; email: string },
) => {
  let decoded;
  console.log(decoded);
  try {
    decoded = jwt.verify(payload, config.ACCESS_SECRET as string) as JwtPayload;

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }
  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }

  const user = await User.findOne({ _id: decoded.id });
  if (data.email != user?.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }

  const hasPassword = await bcrypt.hash(data?.newPassword, 5);
  const result = await User.findOneAndUpdate(
    { email: user.email }, // ✅ this is correct for filtering by email
    { password: hasPassword }, // ✅ new password to set
    { new: true }, // ✅ optional: returns the updated document
  );

  return result;
};

const changePassword = async (
  payload: { oldPassword: string; newPassword: string },
  token: JwtPayload,
) => {
  const existEmail = await User.findOne({ email: token?.email });
  if (!existEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found.');
  }
  const comparePassword = await bcrypt.compare(
    payload?.oldPassword,
    existEmail?.password,
  );
  if (!comparePassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your password is not correct');
  }
  const hasPassword = await bcrypt.hash(payload.newPassword, 5);
  const result = await User.findOneAndUpdate(
    { email: existEmail.email }, // ✅ this is correct for filtering by email
    { password: hasPassword }, // ✅ new password to set
    { new: true }, // ✅ optional: returns the updated document
  );

  return result;
};

const getMeFromDB = async (user: JwtPayload) => {
  const result = await User.findById(user.Id).select('-password');
  return result;
};

const setImageIntoUser = async (file: any, user: JwtPayload) => {
  const { Id } = user;

  const isExistUser = await User.findOne({ Id });

  if (!isExistUser) {
    return new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (file) {
    const path = file?.path;
    const name = isExistUser.fullName.replace(/\s+/g, '_').toLowerCase();

    const { secure_url } = (await sendImageToCloudinary(name, path)) as {
      secure_url: string;
    };
    if (!secure_url) {
      return new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Image not found');
    }
    isExistUser.profileImage = secure_url;
    return await isExistUser.save();
  }
  return isExistUser;
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  createRefreshTokenIntoDB,
  forgetPassword,
  resetPassword,
  changePassword,
  setImageIntoUser,
  getMeFromDB,
  updateUserIntoDB,
};
