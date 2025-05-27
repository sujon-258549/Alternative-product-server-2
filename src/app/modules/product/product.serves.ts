/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../middleware/error/appError';
import { TProduct } from './product.interfaces';
import { User } from '../Auth/simpleAuth/register.model';
import queryBuilder from '../../builder/queryBuilder';
import Product from './productr.mode';
const CreateProductIntoDB = async (payload: TProduct, user: JwtPayload) => {
  const existId = await User.findOne({ _id: user?.Id });
  if (!existId) {
    throw new AppError(404, 'User does not exist!');
  }
  // @ts-expect-error user id
  payload.authorId = existId._id;
  const result = await Product.create(payload);
  return result;
};
const FindAllProductIntoDb = async (query: Record<string, unknown>) => {
  console.log(query);
  const result = new queryBuilder(Product.find().populate('authorId'), query)
    .search([
      'productName',
      'categories',
      'shortDescription',
      'description',
      'currency',
      'brandName',
    ])
    .sort()
    .fields()
    .filter();
  const meta = await result.countTotal();
  const data = await result.modelQuery;
  return { meta, data };
};
const FindSingleProductIntoDb = async (id: string) => {
  const result = await Product.findById(id).populate('authorId');
  return result;
};
const deleteMyProductIntoDb = async (id: string, user: JwtPayload) => {
  const result = await Product.findOneAndDelete({
    _id: id,
    authorId: user.Id,
  });
  return result;
};
const findMyProductIntoDb = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  const result = new queryBuilder(
    Product.find({ authorId: user.Id }).populate('authorId'),
    query,
  )
    .search([
      'categories',
      'shortDescription',
      'description',
      'currency',
      'productName',
      'brandName',
    ])
    .sort()
    .fields()
    .filter();
  const meta = await result.countTotal();
  const data = await result.modelQuery;
  return { meta, data };
};
const UpdateMyProductIntoDb = async (
  payload: Partial<TProduct>,
  user: JwtPayload,
  id: string,
) => {
  const existId = await Product.findOne({ authorId: user?.id, _id: id });
  if (existId) {
    throw new AppError(501, 'Not user Exist!');
  }

  payload.authorId = user.id;
  const result = await Product.create(payload);
  return result;
};

export const productServes = {
  CreateProductIntoDB,
  FindAllProductIntoDb,
  findMyProductIntoDb,
  FindSingleProductIntoDb,
  UpdateMyProductIntoDb,
  deleteMyProductIntoDb,
};
