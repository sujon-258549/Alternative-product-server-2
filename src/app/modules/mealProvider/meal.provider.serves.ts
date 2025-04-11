/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMaleProvider } from './meal.provider.interfaces';
import MaleProvider from './meal.provider.mode';
import { sendImageCloudinary } from './../utility/uploadImageCloudinary';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../Auth/simpleAuth/register.model';
import AppError from '../../middleware/error/appError';
const CreateMealProviderIntoDB = async (
  payload: TMaleProvider,
  file: any,
  user: JwtPayload,
) => {
  const existId = await MaleProvider.findOne({ authorShopId: user?.id });
  if (existId) {
    throw new AppError(501, 'This user already shop create');
  }
  console.log(file, user);
  const path = file?.path;
  const name = payload.shopName;
  const shopLogo = await sendImageCloudinary(name, path);
  payload.authorShopId = user.id;
  // @ts-expect-error secure_url
  payload.shopLogo = shopLogo?.secure_url;
  const result = await MaleProvider.create(payload);
  await User.findByIdAndUpdate(user.id, {
    isShop: true,
    role: 'mealprovider',
  });
  return result;
};

export const mealProviderServes = { CreateMealProviderIntoDB };
