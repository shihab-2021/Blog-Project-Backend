import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await adminServices.blockUser(userId);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'User blocked successfully!',
    data: null,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await adminServices.deleteBlog(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully!',
    data: null,
  });
});

export const adminControllers = { blockUser, deleteBlog };
