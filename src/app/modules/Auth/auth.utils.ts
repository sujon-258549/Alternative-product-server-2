import jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: {
    email: string;
    role: string;
    id: string;
  },
  secret: string,
  expireIn: string,
) => {
  // @ts-expect-error sign
  return jwt.sign(jwtPayload, secret, { expiresIn: expireIn });
};
