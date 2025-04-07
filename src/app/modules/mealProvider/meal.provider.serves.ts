/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMaleProvider } from './meal.provider.interfaces';
import MaleProvider from './meal.provider.mode';
import { sendImageCloudinary } from './../utility/uploadImageCloudinary';
import { JwtPayload } from 'jsonwebtoken';
const CreateMealProviderIntoDB = async (
  payload: TMaleProvider,
  file: any,
  user: JwtPayload,
) => {
  console.log(file, user);
  const path = file?.path;
  const name = payload.shopName;
  const shopLogo = await sendImageCloudinary(name, path);
  console.log(shopLogo);
  const result = await MaleProvider.create(payload);
  return result;
};

export const mealProviderServes = { CreateMealProviderIntoDB };
