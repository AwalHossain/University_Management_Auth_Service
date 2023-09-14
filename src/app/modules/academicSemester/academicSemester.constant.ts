import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface'

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Spring',
  'Summer',
]

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
]

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitleCodeMappping: Record<
  IAcademicSemesterTitles,
  IAcademicSemesterCodes
> = {
  Autumn: '01',
  Spring: '02',
  Summer: '03',
}
