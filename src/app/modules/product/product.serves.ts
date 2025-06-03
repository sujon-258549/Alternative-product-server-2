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
  // const { minPrice, maxPrice } = query as {
  //   minPrice?: string | number;
  //   maxPrice?: string | number;
  // };
  // console.log('Min and Max Prices', minPrice, maxPrice, query);
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
    .filter()
    .paginate();
  // .priceRange(
  //   minPrice != null ? Number(minPrice) : undefined,
  //   maxPrice != null ? Number(maxPrice) : undefined,
  // );

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
  console.log(user);
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
    .paginate()
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
  // Validate payload is not empty
  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError(400, 'Update payload cannot be empty');
  }
  if (typeof payload?.isDigital === 'string') {
    payload.isDigital =
      payload.isDigital && payload.isDigital === 'yes' ? true : false;
  }
  // Find the product that belongs to this user

  const existingProduct = await Product.findOne({ _id: id, authorId: user.Id });

  if (!existingProduct) {
    throw new AppError(
      404,
      'Product not found or you are not authorized to update it',
    );
  }

  // Perform the update
  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new AppError(500, 'Failed to update product');
  }

  return updatedProduct;
};

export const productServes = {
  CreateProductIntoDB,
  FindAllProductIntoDb,
  findMyProductIntoDb,
  FindSingleProductIntoDb,
  UpdateMyProductIntoDb,
  deleteMyProductIntoDb,
};
