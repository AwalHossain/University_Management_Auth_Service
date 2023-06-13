import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

console.log(process.env.PORT, 'port')

// Routes
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academic-semester', AcademicSemesterRoutes)

// Test route
// app.get('/', async (req: Request, res: Response) => {
//   throw new Error('Testing Error logger')
//   // console.log(x);

// })

app.use(globalErrorHandler)

export default app
