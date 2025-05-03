/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../middleware/error/appError';
import { TProduct } from './product.interfaces';
import { sendImageToCloudinary } from '../utility/uploadImageCloudinary';
import { User } from '../Auth/simpleAuth/register.model';
import queryBuilder from '../../builder/queryBuilder';
import Product from './productr.mode';
const CreateProductIntoDB = async (
  payload: TProduct,
  file: any,
  user: JwtPayload,
) => {
  const existId = await User.findOne({ _id: user?.id });
  if (existId) {
    throw new AppError(501, 'Not user Exist!');
  }
  const path = file?.path;
  const name = payload.productName;
  const shopLogo = await sendImageToCloudinary(name, path);
  payload.authorId = user.id;
  // @ts-expect-error secure_url
  payload.shopLogo = shopLogo?.secure_url;
  const result = await Product.create(payload);
  return result;
};
const FindAllProductIntoDb = async (query: Record<string, unknown>) => {
  const result = new queryBuilder(Product.find().populate('authorId'), query);
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
  );
  const meta = await result.countTotal();
  const data = await result.modelQuery;
  return { meta, data };
};
const UpdateMyProductIntoDb = async (
  payload: Partial<TProduct>,
  file: any,
  user: JwtPayload,
  id: string,
) => {
  const existId = await Product.findOne({ authorId: user?.id, _id: id });
  if (existId) {
    throw new AppError(501, 'Not user Exist!');
  }
  if (file) {
    const path = file?.path;
    const name = payload.productName as string;
    const shopLogo = await sendImageToCloudinary(name, path);
    payload.authorId = user.id;
    // @ts-expect-error secure_url
    payload.productUrl = shopLogo?.secure_url;
  }
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
