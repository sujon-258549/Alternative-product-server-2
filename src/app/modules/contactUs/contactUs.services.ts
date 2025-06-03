import Contact from './contactUs.model';
import { IContact } from './contactUs.interface';
import { JwtPayload } from 'jsonwebtoken';
import queryBuilder from '../../builder/queryBuilder';
import { User } from '../Auth/simpleAuth/register.model';
import AppError from '../../middleware/error/appError';

const createContactIntoDB = async (userData: IContact, user: JwtPayload) => {
  console.log(userData);
  const existUser = await User.findOne({ _id: userData.sendId });

  // This condition is backwards - you're throwing if user EXISTS
  if (!existUser) {
    // Changed this condition
    throw new AppError(401, 'user not exist');
  }
  userData.id = user.Id;
  // @ts-expect-error user
  userData.sendId = existUser._id;
  const newContact = await Contact.create(userData); // Changed variable name for clarity
  return newContact;
};
const contactForMeIntoDB = async (
  id: string,
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  console.log('sendId', id, 'userId', user?.Id);
  const newUser = new queryBuilder(
    Contact.find({ sendId: id, id: user.Id }).populate('id').populate('sendId'),
    query,
  )
    .sort()
    .fields()
    .filter();
  const meta = await newUser.countTotal();
  const data = await newUser.modelQuery;
  return { meta, data };
};
const contactForHeIntoDB = async (
  id: string,
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // console.log('sendid', id, user);
  const newUser = new queryBuilder(
    Contact.find({ id: id, sendId: user.Id }).populate('id').populate('sendId'),
    query,
  )
    .sort()
    .fields()
    .filter();
  const meta = await newUser.countTotal();
  const data = await newUser.modelQuery;
  return { meta, data };
};
const contactForMeIntoDB2 = async () => {
  const newUser = await Contact.find().populate('sendId');
  return newUser;
};
const singleContactIntoDB = async (id: string) => {
  const newUser = await Contact.findById(id).populate('sendId');
  return newUser;
};
const deleteContactIntoDB = async (id: string) => {
  const newUser = await Contact.findByIdAndDelete(id);
  return newUser;
};

export const contactServices = {
  createContactIntoDB,
  contactForMeIntoDB,
  singleContactIntoDB,
  contactForMeIntoDB2,
  deleteContactIntoDB,
  contactForHeIntoDB,
};
