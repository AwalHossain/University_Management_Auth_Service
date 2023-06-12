import express, { Application } from 'express'
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

// Test route
// app.get('/', async (req: Request, res: Response) => {
//   throw new Error('Testing Error logger')
//   // console.log(x);

// })

app.use(globalErrorHandler)

export default app
