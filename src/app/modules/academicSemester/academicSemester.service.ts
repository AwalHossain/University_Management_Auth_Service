import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptions } from '../../../interfaces/pagination'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMappping,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilterableFields,
  initAcademicSemesterEvent,
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
      $or: academicSemesterSearchableFields.map(field => ({
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

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)

  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMappping[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid code for title')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)

  return result
}


const createAcademicSemesterFromEvent = async (e: initAcademicSemesterEvent) => {
  try {
    const result = await AcademicSemester.create({
      title: e.title,
      year: e.year,
      code: e.code,
      startMonth: e.startMonth,
      endMonth: e.endMonth,
      syncId: e.id
    })
    console.log(result, 'from event created')
  } catch (err) {
    console.log(err, 'from event')
  }
}

const updateAcademicSemesterFromEvent = async (e: initAcademicSemesterEvent) => {
  try {
    const result = await AcademicSemester.findOneAndUpdate({ syncId: e.id },
      {
        $set: {
          title: e.title,
          year: e.year,
          code: e.code,
          startMonth: e.startMonth,
          endMonth: e.endMonth,
        }
      },
      { new: true }
    )
    console.log(result, 'from event updated')
  } catch (err) {
    console.log(err, 'from event')
  }
}

const deleteAcademicSemesterFromEvent = async (e: initAcademicSemesterEvent) => {
  try {
    const result = await AcademicSemester.findOneAndDelete({ syncId: e.id }, { new: true })
    console.log(result, 'from event deleted')
  } catch (err) {
    console.log(err, 'from event')
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
  createAcademicSemesterFromEvent,
  updateAcademicSemesterFromEvent,
  deleteAcademicSemesterFromEvent
}
