import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Iuser } from './user.interface'
import { UserService } from './users.service'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body

    const result = await UserService.createStudent(student, userData)

    sendResponse<Iuser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body

    const result = await UserService.createFaculty(faculty, userData)

    sendResponse<Iuser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body

    const result = await UserService.createAdmin(admin, userData)

    sendResponse<Iuser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
}
