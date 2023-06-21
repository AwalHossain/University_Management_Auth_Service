import { Model } from 'mongoose'

export type IacademicFaculty = {
  title: string
}

export type academicFacultyModel = Model<
  IacademicFaculty,
  Record<string, unknown>
>

export type IAcademicFacultyFilters = {
  searchTerm?: string
}
