import express, { Application } from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/users.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

console.log(process.env.PORT, 'port')

// Routes
app.use('/api/v1/users', UserRoutes)

app.use(globalErrorHandler)

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('This is for testing purposes')
})

export default app
