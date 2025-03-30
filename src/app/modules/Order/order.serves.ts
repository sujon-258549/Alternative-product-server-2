import { JwtPayload } from 'jsonwebtoken';

const createOrderIntoDB = async (payload, user: JwtPayload) => {
  console.log(payload);
};

export const orderServes = { createOrderIntoDB };
