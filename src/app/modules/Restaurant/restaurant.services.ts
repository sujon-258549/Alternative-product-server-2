import { JwtPayload } from 'jsonwebtoken';
// import { TJwtPayload } from '../types';
import { TMenu } from './restaurant.interface';
import { Restaurant } from './restaurant.model';
import AppError from '../../error/appError';

const createMenuForDayIntoDB = async (payload: TMenu, user: JwtPayload) => {
  const authorId = user?.id;
  payload.author_id = authorId;
  const existDay = Restaurant.findOne({ id: authorId?.author_id });
  const existDayData = await existDay; // Resolve the query
  if (
    existDayData.map=>((element) => element.day === payload.day)
  ) {
    throw new AppError(500, 'Day already exists!');
  }

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
