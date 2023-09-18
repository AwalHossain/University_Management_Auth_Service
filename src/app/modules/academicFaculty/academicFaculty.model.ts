import { Schema, model } from 'mongoose'
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface'

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  IAcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
)
