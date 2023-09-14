// route

import { Router } from 'express'
import { AcademicsSemesterController } from './academicSemester.controller'
import { academicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../../middleware/validateRequest'

const router = Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.academicSemesterZodSchema),
  AcademicsSemesterController.createSemester
)

export const AcademicSemesterRoutes = router
