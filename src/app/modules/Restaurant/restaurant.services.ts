import { JwtPayload } from 'jsonwebtoken';
// import { TJwtPayload } from '../types';
import { TMenu } from './restaurant.interface';
import { Restaurant } from './restaurant.model';
import AppError from '../../error/appError';

const createMenuForDayIntoDB = async (payload: TMenu, user: JwtPayload) => {
  const authorId = user?.id;
  payload.author_id = authorId;
  const existDay = await Restaurant.findOne({
    author_id: authorId,
    day: payload.day,
  });

  console.log(existDay);
  const result = await Restaurant.create(payload);
  console.log(result);
};
const findMyMenuForDayIntoDB = async (user: JwtPayload) => {
  const result = await Restaurant.find({ id: user.author_id });
  return result;
};

export const restaurantServices = {
  createMenuForDayIntoDB,
  findMyMenuForDayIntoDB,
};
