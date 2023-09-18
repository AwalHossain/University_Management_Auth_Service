import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
  syncId?: string
}


export type IAcademicDepartmentEvent = {
  title: string
  academicFacultyId: Types.ObjectId | IAcademicFaculty
  id?: string
}

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export type IAcademicDepartmentFilters = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId | IAcademicFaculty
}
