import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMappping } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import httpStatus from 'http-status'

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

export const AcademicSemesterService = {
  createSemester,
}
