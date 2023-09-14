// route

import { Router } from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'

const router = Router()

router.post(
  '/',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
