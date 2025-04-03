import { JwtPayload } from 'jsonwebtoken';
import { TOrderMenu } from './order.interface';
import { Order } from './order.model';
import { Restaurant } from '../Restaurant/restaurant.model';
import AppError from '../../middleware/error/appError';
import httpStatus from 'http-status';
const createOrderIntoDB = async (payload: TOrderMenu, user: JwtPayload) => {
  console.log({ payload, user });

  // Assign user ID to the order............//////////
  payload.orderId = user.id;
  const existAuthorId = await Restaurant.findOne({
    author_id: payload.author_id,
  });
  if (!existAuthorId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Author Id not Authorize');
  }
  // Calculate the total price into days
  const totalPrice = payload.days.reduce((acc, day) => {
    return (
      acc +
      (day.morning?.price || 0) +
      (day.evening?.price || 0) +
      (day.night?.price || 0)
    );
  }, 0);
  payload.total_price = totalPrice;
  const res = await Order.create(payload);

  return res; // Include total price in the response
};

export const orderServes = { createOrderIntoDB };
