import { Model } from 'mongoose'

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemesterTitles = 'Autumn' | 'Spring' | 'Summer'

export type IAcademicSemesterCodes = '01' | '02' | '03'

export type IAcademicSemester = {
  title: IAcademicSemesterTitles
  year: string
  code: IAcademicSemesterCodes
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type IAcademicSemesterFilterableFields = {
  searchTerm?: string
  title?: IAcademicSemesterTitles
  code?: IAcademicSemesterCodes
  year?: number
}

export type AcademicSemesterModel = Model<IAcademicSemester>
