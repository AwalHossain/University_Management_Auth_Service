import express, { Application } from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

console.log(process.env.PORT, 'port')

// Routes
app.use('/api/v1/users', usersRouter)

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('This is for testing purposes')
})

export default app
