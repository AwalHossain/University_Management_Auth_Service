import { ENUM_USER_ROLE } from '../../../enums/user'

export type ILoginUser = {
  id: string
  password: string
}

export type ILoginResponse = {
  accessToken: string
  refreshToken: string
  needsPasswordChange: boolean
}

export type IVerifiedLoginUser = {
  id: string
  role: ENUM_USER_ROLE
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
