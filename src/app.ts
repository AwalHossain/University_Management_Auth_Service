import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes/index';

import cookieParser from 'cookie-parser';


const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser());


console.log(process.env.PORT, 'port')

// Routes
app.use('/api/v1', routes)

// Test route
app.get('/', async (req: Request, res: Response) => {
    res.status(200).send('helelo')

})

app.use(globalErrorHandler)

export default app
