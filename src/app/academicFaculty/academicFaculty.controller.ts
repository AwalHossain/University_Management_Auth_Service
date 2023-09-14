import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../constants/pagination'
import catchAsync from '../../shared/catchAsync'
import pick from '../../shared/pick'
import sendResponse from '../../shared/sendResponse'
import { academicFacultyFilterableFields } from './academicFaculty.constants'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyService } from './academicFaculty.service'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body

  const result = await AcademicFacultyService.createFaculty(academicFacultyData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faculties fetched successfully',
    data: result.data,
    meta: result.meta,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.getSingleFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...facultyData } = req.body
  const result = await AcademicFacultyService.updateFaculty(id, facultyData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.deleteFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
