import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

const findLastStudentId = async (): Promise<string | undefined> => {
  // find the last user id in the database
  const lasStudentId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lasStudentId?.id ? lasStudentId.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  // create 5 digit user id and increment by 1
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')

  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementId}`

  return incrementId
}

export const findLastFacultyId = async (): Promise<string | undefined> => {
  // find the last user id in the database
  const lasFacultyId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lasFacultyId?.id ? lasFacultyId.id.substring(2) : undefined
}

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')

  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementId = `F-${incrementId}`
  return incrementId
}

export const findLastAdminId = async (): Promise<string | undefined> => {
  // find the last user id in the database
  const lasAdminId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lasAdminId?.id ? lasAdminId.id.substring(2) : undefined
}

export const generateAdminId = async () => {
  const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0')

  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementId = `A-${incrementId}`
  return incrementId
}
