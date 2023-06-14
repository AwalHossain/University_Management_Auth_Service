import express from 'express'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
]

moduleRoutes.forEach(moduleRoute => {
  router.use(moduleRoute.path, moduleRoute.route)
})

export default router
