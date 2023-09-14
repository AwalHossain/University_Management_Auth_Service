import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../../academicFaculty/academicFaculty.interface'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { UserName } from '../student/student.interface'

export type IFaculty = {
  id: string
  name: UserName
  profileImage: string
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender?: 'male' | 'female'
  permanentAddress?: string
  presentAddress?: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
  designation: string
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  gender?: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  academicDepartment?: string
  academicFaculty?: string
  designation?: string
}
