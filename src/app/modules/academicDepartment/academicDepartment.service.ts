import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )

  return result
}

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andCondition = []

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }

  const sortCondition: {
    [key: string]: SortOrder
  } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {}

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await AcademicDepartment.countDocuments(whereCondition)

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty')

  return result
}

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  )
  return result
}

export const academicDepartmentService = {
  getAllDepartments,
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
