import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptions } from '../../../interfaces/pagination'
import {
  academicSemesterFilterableFields,
  academicSemesterTitleCodeMappping,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilterableFields,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // auto generate id

  if (academicSemesterTitleCodeMappping[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid code for title')
  }
  const result = await AcademicSemester.create(payload)

  return result
}

const getAllSemester = async (
  filters: IAcademicSemesterFilterableFields,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // down here we are adding the filters to the andConditions array
  // here we pushing exact filters to the andConditions array with the search term

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec()

  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
}
