/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { TRecommendation } from './recommendation.interface';
import Product from '../product/productr.mode';
import { ObjectId, Types } from 'mongoose';
import Recommendation from './recommendation.model';
import queryBuilder from '../../builder/queryBuilder';

const createRecommendationIntoDb = async (
  payload: TRecommendation,
  user: JwtPayload,
  id: string,
) => {
  const findAuthorId = await Product.findById(id);
  payload.authorId = findAuthorId?.authorId as ObjectId;
  payload.recommendationAuthorId = user.Id as ObjectId;
  payload.productId = id as unknown as ObjectId;
  const result = await Recommendation.create(payload);
  return result;
};

const fondSpecifyRecommendationIntoDb = async (id: string) => {
  const result = await Recommendation.find({ productId: id });
  return result;
};
const allRecommendedIntoDb = async (query: Record<string, unknown>) => {
  console.log(query);
  const recommendation = new queryBuilder(
    Recommendation.find()
      .populate('productId')
      .populate('recommendationAuthorId')
      .populate('authorId'),
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
    .paginate()
    .fields()
    .filter();
  const meta = await recommendation.countTotal();
  const data = await recommendation.modelQuery;
  return { meta, data };
};
const myRecommendationIntoDb = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  console.log(query);
  const recommendation = new queryBuilder(
    Recommendation.find({ recommendationAuthorId: user.Id })
      .populate('productId')
      .populate('recommendationAuthorId')
      .populate('authorId'),
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
    .paginate()
    .fields()
    .filter();
  const meta = await recommendation.countTotal();
  const data = await recommendation.modelQuery;
  return { meta, data };
};
const recommendationForMeIntoDb = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  const recommendation = new queryBuilder(
    Recommendation.find({ authorId: user.Id })
      .populate('productId')
      .populate('recommendationAuthorId')
      .populate('authorId'),
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
    .paginate()
    .fields()
    .filter();
  const meta = await recommendation.countTotal();
  const data = await recommendation.modelQuery;
  return { meta, data };
};
const recommendationRelatedProductIntoDb = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const recommendation = new queryBuilder(
    Recommendation.find({ productId: id })
      .populate('productId')
      .populate('recommendationAuthorId')
      .populate('authorId'),
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
    .paginate()
    .fields()
    .filter();
  const meta = await recommendation.countTotal();
  const data = await recommendation.modelQuery;
  return { meta, data };
};

const deleteMyRecommendationIntoDb = async (id: string, user: JwtPayload) => {
  const result = await Recommendation.findByIdAndDelete({
    _id: id,
    recommendationAuthorId: user.Id,
  });
  return result;
};
const findSingleRecommendationIntoDb = async (id: string) => {
  const result = await Recommendation.findById(id)
    .populate('productId')
    .populate('recommendationAuthorId')
    .populate('authorId');
  return result;
};
const updateRecommendationIntoDb = async (
  id: string,
  user: JwtPayload,
  payload: Partial<TRecommendation>,
) => {
  if (typeof payload?.isDigital === 'string') {
    payload.isDigital =
      payload.isDigital && payload.isDigital === 'yes' ? true : false;
  }
  const result = await Recommendation.findOneAndUpdate(
    {
      _id: new Types.ObjectId(id),
      recommendationAuthorId: user.userId,
    },
    payload,
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    },
  );
  return result;
};

export const recommendationServices = {
  createRecommendationIntoDb,
  fondSpecifyRecommendationIntoDb,
  myRecommendationIntoDb,
  recommendationForMeIntoDb,
  deleteMyRecommendationIntoDb,
  findSingleRecommendationIntoDb,
  updateRecommendationIntoDb,
  allRecommendedIntoDb,
  recommendationRelatedProductIntoDb,
};
