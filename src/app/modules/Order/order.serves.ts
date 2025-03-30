import { JwtPayload } from 'jsonwebtoken';

const createOrderIntoDB = async (payload, user: JwtPayload) => {
  console.log({ payload, user });
};

export const orderServes = { createOrderIntoDB };
