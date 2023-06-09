import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  )
}

export default globalErrorHandler
