import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'

import { Request, Response } from 'express'
import pick from '../../../shared/pick'
import {
  academicDepartmentFilterableFields,
  academicDepartmentSearchableFields,
} from './academicDepartment.constant'
import { academicDepartmentService } from './academicDepartment.service'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await academicDepartmentService.createDepartment(
    academicDepartmentData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, academicDepartmentSearchableFields)

  const result = await academicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await academicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicDepartmentService.updateDepartment(id, req.body)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicDepartmentService.deleteDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  getSingleDepartment,
}
