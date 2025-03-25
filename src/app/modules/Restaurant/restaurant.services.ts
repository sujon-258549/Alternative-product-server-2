import { JwtPayload } from 'jsonwebtoken';
// import { TJwtPayload } from '../types';
import { TMenu } from './restaurant.interface';
import { Restaurant } from './restaurant.model';
import AppError from '../../middleware/error/appError';

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
const findMyMenuForDayIntoDB = async (user: JwtPayload) => {
  const result = await Restaurant.find({ id: user.author_id });
  return result;
};

export const restaurantServices = {
  createMenuForDayIntoDB,
  findMyMenuForDayIntoDB,
};
