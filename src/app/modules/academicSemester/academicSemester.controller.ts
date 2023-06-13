import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
  const { ...academicSemesterData } = req.body
  // console.log(user, 'user')

  try {
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    res.status(201).json({
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const AcademicsSemesterController = {
  createSemester,
}
