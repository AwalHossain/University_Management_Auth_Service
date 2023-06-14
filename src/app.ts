import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes/index'
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

console.log(process.env.PORT, 'port')

// Routes
app.use('/api/v1/', routes)

// Test route
// app.get('/', async (req: Request, res: Response) => {
//   throw new Error('Testing Error logger')
//   // console.log(x);

// })

app.use(globalErrorHandler)

export default app
