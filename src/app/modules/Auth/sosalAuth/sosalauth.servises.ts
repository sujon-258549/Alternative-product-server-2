import { SosalAuth } from './sosalauth.model';
import { TSosalAuth } from './sosalauth.interfaces';

const createSosalUserIntoDB = async (payload: TSosalAuth) => {
  console.log(payload);
  const existEmail = await SosalAuth.findOne({
    email: payload?.email,
  });
  if (existEmail) {
    console.log('email already exist');
  }
  const result = await SosalAuth.create(payload);
  return result;
};
// const findMyMenuForDayIntoDB = async (
//   user: JwtPayload,
//   query: Record<string, unknown>,
// ) => {
//   //   const result = await Restaurant.find({ id: user.author_id });
//   const restorenet = new queryBuilder(Restaurant.find(), query);
//   const meta = await restorenet.countTotal();
//   const data = await restorenet.modelQuery;
//   return { meta, data };
// };

export const sosalAuthServices = {
  createSosalUserIntoDB,
};
