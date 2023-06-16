import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicSemesterFilterableFields } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterService } from './academicSemester.service'

// create semester controller
const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    // console.log(user, 'user')

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    })
    next()
  }
)

const getAllSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)
    const filters = pick(req.query, academicSemesterFilterableFields)
    const result = await AcademicSemesterService.getAllSemester(
      filters,
      paginationOptions
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is fetched successfully!',
      meta: result.meta,
      data: result.data,
    })

    next()
  }
)

export const AcademicsSemesterController = {
  createSemester,
  getAllSemester,
}
