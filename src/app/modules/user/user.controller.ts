import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Iuser } from './user.interface'
import { UserService } from './users.service'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body

    const result = await UserService.createUser(user)

    res.status(201).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })

    sendResponse<Iuser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
    next()
  }
)

export const UserController = {
  createUser,
}
