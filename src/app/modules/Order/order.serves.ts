/* eslint-disable no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import { TOrderMenu } from './order.interface';
import { Order } from './order.model';
import AppError from '../../middleware/error/appError';
import httpStatus from 'http-status';
import { sslServices } from '../sslCommeriz/sslCommeriz.servises';
import MaleProvider from '../mealProvider/meal.provider.mode';
const createOrderIntoDB = async (payload: TOrderMenu, user: JwtPayload) => {
  console.log({ payload, user });

  // Assign user ID to the order
  payload.orderId = user.id;
  const existAuthorId = await MaleProvider.findOne({
    userid: payload.author_id,
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
  const digits = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 10),
  ).join('');
  const bigIntNumber = BigInt(digits);
  let result;
  if (res) {
    result = await sslServices.insertPayment({
      total_amount: totalPrice,
      //  @ts-expect-error tran
      tran_id: bigIntNumber,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    result = { paymentUrl: result };
  }
  return result; // Include total price in the response
};

export const orderServes = { createOrderIntoDB };
