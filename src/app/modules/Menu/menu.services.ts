import { JwtPayload } from 'jsonwebtoken';
// import { TJwtPayload } from '../types';
import { TMenu } from './menu.interface';
import { Restaurant } from './menu.model';
import AppError from '../../middleware/error/appError';
import queryBuilder from '../../builder/queryBuilder';

const createMenuForDayIntoDB = async (payload: TMenu, user: JwtPayload) => {
  const authorId = user?.id;
  payload.author_id = authorId;
  const existDay = await Restaurant.findOne({
    author_id: authorId,
    day: payload.day,
  });
  if (existDay) {
    throw new AppError(500, 'Day already exists!');
  }
  const result = await Restaurant.create(payload);
  return result;
};
const findMyMenuForDayIntoDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  //   const result = await Restaurant.find({ id: user.author_id });
  const restorenet = new queryBuilder(Restaurant.find(), query);
  const meta = await restorenet.countTotal();
  const data = await restorenet.modelQuery;
  return { meta, data };
};

export const restaurantServices = {
  createMenuForDayIntoDB,
  findMyMenuForDayIntoDB,
};
