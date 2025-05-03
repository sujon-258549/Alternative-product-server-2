import catchAsync from '../utility/catchAsync';
import httpStatus from 'http-status';
import sendSuccess from '../utility/send-success';
import { Request, Response } from 'express';
import { productServes } from './product.serves';
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await productServes.CreateProductIntoDB(
    data,
    req.file,
    // @ts-expect-error user
    req?.user,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await productServes.FindAllProductIntoDb(query);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'All Product retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productServes.FindSingleProductIntoDb(id);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Single Product retrieved successfully',
    data: result,
  });
});
const deleteMyProduct = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const user = req?.user;
  const { id } = req.params;
  const result = await productServes.deleteMyProductIntoDb(id, user);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'My Product delete successfully',
    data: result,
  });
});
const findMyProduct = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const user = req?.user;
  const result = await productServes.findMyProductIntoDb(req.query, user);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'My Product retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const file = req.file;
  const { id } = req.params;
  // @ts-expect-error user
  const user = req.user;
  const result = await productServes.UpdateMyProductIntoDb(
    data,
    file,
    user,
    id,
  );
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Product update successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  findMyProduct,
  getSingleProduct,
  deleteMyProduct,
  updateProduct,
};
