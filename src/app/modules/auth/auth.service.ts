import httpStatus from 'http-status'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { User } from '../user/user.model'
import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface'

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payload

  const isUserExist = await User.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  console.log(User.isPasswordMatched(password, isUserExist.password), 'isUserExist');

  const isPasswordMatched = await User.isPasswordMatched(password, isUserExist.password)

  console.log(isPasswordMatched, 'isPasswordMatched');


  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match')
  }

  // create access token & refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify refresh token
  // invalid token - synchronous

  let verifiedToken = null

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
  }

  // check if user exist
  const { userId } = verifiedToken

  const isUserExist = await User.isUserExist(userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // create new access token

  const newAccessToken = jwtHelpers.createToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}


const changePassword = async (user: JwtPayload | null
  , payload: any): Promise<any> => {

  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.findOne({ id: user?.userId }).select('+password');

  console.log(isUserExist, 'isUserExist');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (!User.isPasswordMatched(oldPassword, isUserExist?.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password does not match')
  }

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  await isUserExist.save();
}


export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
