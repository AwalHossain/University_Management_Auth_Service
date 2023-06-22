import { Schema, model } from 'mongoose'
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academicDepartment.interface'

const AcademicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema)
