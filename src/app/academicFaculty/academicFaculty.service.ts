import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IpaginationOptions } from '../../interfaces/pagination'
import { academicFacultyFilterableFields } from './academicFaculty.constants'
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IpaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters
  const { limit, skip, sortBy, page, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andCondtions = []
  if (searchTerm) {
    andCondtions.push({
      $or: academicFacultyFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondtions.push({
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

  const whereCondition = andCondtions.length ? { $and: andCondtions } : {}

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await AcademicFaculty.countDocuments(whereCondition)

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    }
  )

  return result
}

const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const AcademicFacultyService = {
  createFaculty,
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
