import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentEvent,
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



/**
 * @description (1) Create a new department from the redis event
 * @description (2) Update the department from the redis event
 * @description (3) Delete the department from the redis event
 */

const createAcademicDepartmentFromEvent = async (e: IAcademicDepartmentEvent) => {

  try {
    const academicFaculty = await AcademicFaculty.findOne({ syncId: e.academicFacultyId })

    const academicDepartment = await AcademicDepartment.create({
      title: e.title,
      academicFaculty: academicFaculty?._id,
      syncId: e.id,
    });

    const result = await academicDepartment.populate('academicFaculty');
    console.log(result, 'from created event')
  } catch (err) {
    console.log(err);
  }


}

const updateAcademicDepartmentFromEvent = async (e: IAcademicDepartmentEvent) => {
  try {
    const payload = {
      title: e.title,
    }
    const result = await AcademicDepartment.findOneAndUpdate(
      { syncId: e.id },
      {
        $set: payload,
      },
      {
        new: true,
      }
    )
    console.log(result, 'from updated event')
  } catch (err) {
    console.log(err);
  }
}


const deleteAcademicDepartmentFromEvent = async (e: IAcademicDepartmentEvent) => {

  try {
    const result = await AcademicDepartment.findOneAndDelete({ syncId: e.id })
    console.log(result, 'from deleted event')
  } catch (err) {
    console.log(err);
  }
}

export const academicDepartmentService = {
  getAllDepartments,
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createAcademicDepartmentFromEvent,
  updateAcademicDepartmentFromEvent,
  deleteAcademicDepartmentFromEvent
}
