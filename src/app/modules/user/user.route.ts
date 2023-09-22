// route

import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
)

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
)

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createStudent
)

export const UserRoutes = router
