/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { IAdmin } from '../admin/admin.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IStudent } from '../student/student.interface'

export type Iuser = {
  id: string
  role: string
  password: string
  needsPasswordChange: boolean
  passwordCahngedAt?: Date
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId | IAdmin
}

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<Iuser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<Iuser>

// export type UserModel = Model<Iuser, Record<string, unknown>>
