import { Request, Response } from 'express';
import catchAsync from '../utility/catchAsync';
import sendSuccess from '../utility/send-success';
import { recommendationServices } from './recommendationservices';
import httpStatus from 'http-status';
const createRecommendation = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const user = req?.user;
  const { id } = req.params;
  const result = await recommendationServices.createRecommendationIntoDb(
    req.body,
    user,
    id,
    req.file,
  );
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Create recommendation successfully',
    data: result,
  });
});

const findSpecifyRecommendation = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await recommendationServices.fondSpecifyRecommendationIntoDb(id);
    sendSuccess(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'Recommendation retrieved successfully',
      data: result,
    });
  },
);
const findSingleRecommendation = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await recommendationServices.findSingleRecommendationIntoDb(id);
    sendSuccess(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'Find my recommendation  successfully',
      data: result,
    });
  },
);
const myRecommendation = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const user = req?.user;
  const result = await recommendationServices.myRecommendationIntoDb(
    user,
    req.query,
  );
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'My recommendation retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const recommendationForMe = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const user = req?.user;
  const result = await recommendationServices.recommendationForMeIntoDb(
    user,
    req.query,
  );
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'My Product recommendation retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const deleteRecommendation = catchAsync(async (req: Request, res: Response) => {
  // @ts-expect-error user
  const user = req?.user;
  const { id } = req.params;
  const result = await recommendationServices.deleteMyRecommendationIntoDb(
    id,
    user,
  );
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Delete My recommendation  successfully',
    data: result,
  });
});

const updateMyRecommendation = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // @ts-expect-error user
    const user = req?.user;
    const result = await recommendationServices.updateRecommendationIntoDb(
      id,
      user,
      req.body,
    );
    sendSuccess(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'Update my recommendation  successfully',
      data: result,
    });
  },
);

export const recommendationController = {
  createRecommendation,
  findSpecifyRecommendation,
  myRecommendation,
  recommendationForMe,
  deleteRecommendation,
  findSingleRecommendation,
  updateMyRecommendation,
};
