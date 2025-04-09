import express from 'express';

const app = express();
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import AppError from '../../middleware/error/appError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Order } from '../Order/order.model';
const storeId = config.STORE_ID;
const storePassword = config.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

const insertPayment = async (paymentData: {
  total_amount: number;
  tran_id: string | number;
}) => {
  const { total_amount, tran_id } = paymentData;
  const data = {
    total_amount: total_amount, // ✅ number
    currency: 'BDT', // ✅ string
    tran_id: String(tran_id), // ✅ ensure it's a string
    success_url: config.SUCCESS_URL,
    fail_url: config.FAIL_URL,
    cancel_url: config.CANCEL_URL,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000', // ✅ make sure this is a string
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(
    storeId as string,
    storePassword as string,
    is_live,
  );

  try {
    // @ts-expect-error data
    const apiResponse = await sslcz.init(data);

    // Redirect the user to the payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;

    if (GatewayPageURL) {
      return GatewayPageURL;
    } else {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Failed to generate payment gateway URL.',
      );
    }
  } catch (error) {
    console.log(error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'An error occurred while processing payment.',
    );
  }
};

const validatePaymentService = async (tran_id: string): Promise<boolean> => {
  const sslcz = new SSLCommerzPayment(
    storeId as string,
    storePassword as string,
    is_live,
  );

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //@ts-expect-error payment
    const validationResponse = await sslcz.transactionQueryByTransactionId({
      tran_id,
    });

    console.log(validationResponse.element);

    let data;

    if (
      validationResponse.element[0].status === 'VALID' ||
      validationResponse.element[0].status === 'VALIDATED'
    ) {
      data = {
        status: 'Paid',
        gatewayResponse: validationResponse.element[0],
      };
    } else if (validationResponse.element[0].status === 'INVALID_TRANSACTION') {
      data = {
        status: 'Failed',
        gatewayResponse: validationResponse.element[0],
      };
    } else {
      data = {
        status: 'Failed',
        gatewayResponse: validationResponse.element[0],
      };
    }

    // const updatedPayment = await Order.findOneAndUpdate(
    //   { transactionId: validationResponse.element[0].tran_id },
    //   data,
    //   { new: true, session },
    // );

    // if (!updatedPayment) {
    //   throw new Error('Payment not updated');
    // }

    const updatedOrder = await Order.findByIdAndUpdate(
      updatedPayment?.order,
      {
        paymentStatus: data.status,
      },
      { new: true, session },
    ).populate('user products.product');

    if (!updatedOrder) {
      throw new Error('Order not updated');
    }

    if (data.status === 'Failed') {
      throw new Error('Payment failed');
    }

    // Commit transaction only if no errors occurred
    await session.commitTransaction();
    session.endSession();

    console.log('email');

    const pdfBuffer = await generateOrderInvoicePDF(updatedOrder);
    const emailContent = await EmailHelper.createEmailContent(
      //@ts-ignore
      { userName: updatedOrder.user.name || '' },
      'orderInvoice',
    );

    const attachment = {
      filename: `Invoice_${updatedOrder._id}.pdf`,
      content: pdfBuffer,
      encoding: 'base64',
    };

    await EmailHelper.sendEmail(
      //@ts-expect-error email
      updatedOrder.user.email,
      emailContent,
      'Order confirmed-Payment Success!',
      attachment,
    );

    return true;
  } catch (error) {
    // Only abort the transaction if an error occurred
    await session.abortTransaction();
    session.endSession();

    console.error(error); // Log the error for debugging
    return false;
  }
};

export const sslServices = { insertPayment, validatePaymentService };
