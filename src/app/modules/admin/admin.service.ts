import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';

const blockUser = async (userId: string) => {
  const result = await User.isUserExistsById(userId);
  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Not Found Error: User does not exists!',
      'NOT_FOUND_ERROR',
    );
  }
  const blockUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return blockUser;
};

const deleteBlog = async (id: string) => {
  // checking blog exists
  const blog = await Blog.isBlogExistsById(id);
  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Not Found Error: Blog does not exists!',
      'NOT_FOUND_ERROR',
    );
  }

  // delete blog from db
  const deleteBlog = await Blog.findByIdAndDelete(id);

  return deleteBlog;
};

export const adminServices = { blockUser, deleteBlog };
