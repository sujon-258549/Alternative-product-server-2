import { JwtPayload } from 'jsonwebtoken';
// import { TJwtPayload } from '../types';
import { TMenu } from './menu.interface';
import { Menu } from './menu.model';
import AppError from '../../middleware/error/appError';
import queryBuilder from '../../builder/queryBuilder';

const createMenuForDayIntoDB = async (payload: TMenu, user: JwtPayload) => {
  const authorId = user?.id;
  payload.author_id = authorId;
  const existDay = await Menu.findOne({
    author_id: authorId,
  });
  if (existDay) {
    throw new AppError(
      400,
      'Menu already exists for this day. Please update the existing menu.',
    );
  }

  const result = await Menu.create(payload);
  return result;
};
const findAllMenuIntoDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  //   const result = await Restaurant.find({ id: user.author_id });
  const restorenet = new queryBuilder(Menu.find(), query);
  const meta = await restorenet.countTotal();
  const data = await restorenet.modelQuery;
  return { meta, data };
};
const findSingleMenu = async (id: string) => {
  const result = await Menu.findById(id);
  return result;
};

const findMyMenu = async (user: JwtPayload) => {
  const result = await Menu.findOne({ author_id: user?.id });
  return result;
};
const updateMyMenu = async (payload: Partial<TMenu>, user: JwtPayload) => {
  console.log('payload', payload);
  const result = await Menu.findOneAndUpdate(
    { author_id: user?.id },
    payload,
    { new: true }, // return the updated document
  );

  if (!result) {
    throw new AppError(404, 'Menu not found for this user.');
  }

  return result;
};

export const restaurantServices = {
  createMenuForDayIntoDB,
  findAllMenuIntoDB,
  findMyMenu,
  updateMyMenu,
  findSingleMenu,
};
