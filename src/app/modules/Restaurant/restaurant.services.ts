import { JwtPayload } from 'jsonwebtoken';
// import { TJwtPayload } from '../types';
import { TMenu } from './restaurant.interface';
import { Restaurant } from './restaurant.model';

const createMenuForDayIntoDB = async (payload: TMenu, user: JwtPayload) => {
  const authorId = user?.id;
  payload.author_id = authorId;
  const result = await Restaurant.create(payload);
  return result;
};

export const restaurantServices = { createMenuForDayIntoDB };
