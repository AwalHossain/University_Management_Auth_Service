// route

import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicsSemesterController } from './academicSemester.controller'
import { academicSemesterValidation } from './academicSemester.validation'

const router = Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.academicSemesterZodSchema),
  AcademicsSemesterController.createSemester
)

router.get('/:id', AcademicsSemesterController.getSingleSemester)
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicsSemesterController.updateSemester
)

router.get('/', AcademicsSemesterController.getAllSemester)

export const AcademicSemesterRoutes = router
