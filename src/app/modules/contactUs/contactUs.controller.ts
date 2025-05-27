import { Request, Response } from 'express';
import status from 'http-status';
import { contactServices } from './contactUs.services';
import sendSuccess from '../utility/send-success';
import catchAsync from '../utility/catchAsync';
const createContact = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await contactServices.createContactIntoDB(req.body);

  sendSuccess(res, {
    statuscode: status.OK,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});
const singleContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await contactServices.singleContactIntoDB(id);
  sendSuccess(res, {
    statuscode: status.OK,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});
const contactForMe = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const user = req.user;
  const result = await contactServices.contactForMeIntoDB(user, req.query);

  sendSuccess(res, {
    statuscode: status.OK,
    success: true,
    message: 'my contact retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const contactForMe2 = catchAsync(async (req: Request, res: Response) => {
  const result = await contactServices.contactForMeIntoDB2();
  sendSuccess(res, {
    statuscode: status.OK,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});

export const contactController = {
  createContact,
  contactForMe2,
  singleContact,
  contactForMe,
};
