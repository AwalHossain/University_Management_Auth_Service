import express, { Application } from 'express'
import { Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
