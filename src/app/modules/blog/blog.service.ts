import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createBlog = async (userData: JwtPayload, payload: IBlog) => {
  // finding the user
  const user = await User.findOne({ email: userData.email });

  // adding blog to db
  const blogData = { ...payload, author: user?._id };
  const createdBlog = await Blog.create(blogData);

  // populate author details
  const result = await Blog.findById(createdBlog._id).populate({
    path: 'author',
    select: 'name email role',
  });

  return result;
};

const updateBlog = async (userData: JwtPayload, id: string, payload: IBlog) => {
  // finding the user
  const user = await User.findOne({ email: userData.email });

  // checking blog exists
  const blog = await Blog.isBlogExistsById(id);
  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Not Found Error: Blog does not exists!',
      'NOT_FOUND_ERROR',
    );
  }

  // checking if the author of the blog match
  if (blog?.author.toString() !== user?._id.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Authorization Error: Blog author does not matching!',
      'AUTHORIZATION_ERROR',
    );
  }

  // update the blog in db
  await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // populate author details
  const result = await Blog.findById(id).populate({
    path: 'author',
    select: 'name email role',
  });

  return result;
};

const deleteBlog = async (userData: JwtPayload, id: string) => {
  // finding the user
  const user = await User.findOne({ email: userData.email });

  // checking blog exists
  const blog = await Blog.isBlogExistsById(id);
  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Not Found Error: Blog does not exists!',
      'NOT_FOUND_ERROR',
    );
  }

  // checking if the author of the blog match
  if (blog?.author.toString() !== user?._id.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Authorization Error: Blog author is not matching!',
      'AUTHORIZATION_ERROR',
    );
  }

  // update the isDelete in db
  const updateIsDelete = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return updateIsDelete;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];
  const blogs = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .sort()
    .filter();

  const result = await blogs.modelQuery.populate({
    path: 'author',
    select: 'name email role',
  });
  return result;
};

export const blogServices = { createBlog, updateBlog, deleteBlog, getAllBlogs };
