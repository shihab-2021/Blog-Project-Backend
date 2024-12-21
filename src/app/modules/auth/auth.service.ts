import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ILoginUser, IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUser = async (payload: IUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'User with this email already exists!',
    );
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  // checking if the user is exists
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Not Found Error: User does not exists!',
      'NOT_FOUND_ERROR',
    );
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Authorization Error: This user is deleted!',
      'AUTHORIZATION_ERROR',
    );
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Authorization Error: This user is blocked!',
      'AUTHORIZATION_ERROR',
    );
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: Password didn't matched!",
      'AUTHORIZATION_ERROR',
    );
  }

  // creating token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const token = createToken(
    jwtPayload as { role: string; email: string },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { token };
};

export const authServices = { registerUser, loginUser };
