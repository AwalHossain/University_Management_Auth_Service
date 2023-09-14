// route

import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

export const UserRoutes = router
