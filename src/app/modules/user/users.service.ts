import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { Iuser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createStudent = async (
  student: IStudent,
  user: Iuser
): Promise<Iuser | null> => {
  // if password is not provided, set default password

  if (!user.password) {
    user.password = config.default_pass as string
  }

  // set role
  user.role = 'student'

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean()

  let newUserAllData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // generate student id
    const id = await generateStudentId(academicsemester as IAcademicSemester)
    // set custom id into both user and student

    user.id = id
    student.id = id

    // create student using session
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    //set student _id(reference) into user.student
    user.student = newStudent[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'acdemicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
}
