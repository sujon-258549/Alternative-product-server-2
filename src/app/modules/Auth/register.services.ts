import { TRegister } from './register.interface';
import { User } from './register.model';

const createUserIntoDB = async (payload: TRegister) => {
  const result = await User.create(payload);
  return result;
};

export const UserServices = { createUserIntoDB };
