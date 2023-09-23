import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { RedisClient } from '../../../shared/redis'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { ADMIN_EVENT_CREATED, FACULTY_EVENT_CREATED, STUDENT_EVENT_CREATED } from './user.constant'
import { Iuser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'

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
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  if (newUserAllData) {
    console.log('newUserAllData', newUserAllData);

    const check = await RedisClient.publish(STUDENT_EVENT_CREATED, JSON.stringify(newUserAllData.student));
    console.log(check, 'check');

  }

  return newUserAllData
}

const createFaculty = async (
  faculty: IFaculty,
  user: Iuser
): Promise<Iuser | null> => {
  // if password is not provided, set default password
  if (!user.password) {
    user.password = config.default_pass as string
  }

  // set role
  user.role = 'faculty'

  let newUserAllData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // generate faculty id
    const id = await generateFacultyId()

    // set custom id into both user and faculty
    user.id = id
    faculty.id = id

    // create faculty using session
    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    //set faculty _id(reference) into user.faculty
    user.faculty = newFaculty[0]._id

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
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  if (newUserAllData) {
    console.log('newUserAllData');

    const check = await RedisClient.publish(FACULTY_EVENT_CREATED, JSON.stringify(newUserAllData));
    console.log(check, 'check');

  }

  return newUserAllData
}



const createAdmin = async (
  admin: IAdmin,
  user: Iuser
): Promise<Iuser | null> => {
  // if password is not provided, set default password
  if (!user.password) {
    user.password = config.default_pass as string
  }

  // set role
  user.role = 'admin'

  let newUserAllData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // generate faculty id
    const id = await generateAdminId()

    // set custom id into both user and faculty
    user.id = id
    admin.id = id

    // create faculty using session
    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    //set faculty _id(reference) into user.faculty
    user.admin = newAdmin[0]._id

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
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  if (newUserAllData) {
    console.log('newUserAllData');

    const check = await RedisClient.publish(ADMIN_EVENT_CREATED, JSON.stringify(newUserAllData));
    console.log(check, 'check');

  }


  return newUserAllData
}

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
