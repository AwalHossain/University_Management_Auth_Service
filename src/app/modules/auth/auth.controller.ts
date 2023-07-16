import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)

  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: others,
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  })
})

// const changePassword = catchAsync(async(req: Request, res: Response) => {

//             const {...passWordData} = req.body;
//             const result = await AuthService.changePassword(changePasswordData);

//             sendResponse(res,{
//                 statusCode: 200,
//                 success: true,
//                 message: 'Password changed successfully',
//                 data: result,
//             })
//         }
//     )

export const AuthController = {
  loginUser,
  refreshToken,
}
