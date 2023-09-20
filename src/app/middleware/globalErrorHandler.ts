import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import handZodError from '../../errors/handleZodError'
import { IGenericErrorResponse } from '../../interfaces/common'
import { IGenericErrorMessage } from '../../interfaces/error'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log(`globalErrorHandleer`, error)
    : errorLogger.error(`globalErrorHandleer---`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    const simplifiedError: IGenericErrorResponse = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
        {
          path: '',
          message: error?.message,
        },
      ]
      : []
  } else if (error.code === 11000) {
    statusCode = 400;
    message = `Duplicate key error`;


    // Extract the keyPattern and keyValue properties
    const { keyPattern, keyValue } = error;

    // Create a dynamic error message based on the index causing the error
    let duplicateField = '';
    if (keyPattern) {
      const fields = Object.keys(keyPattern);
      if (fields.length > 0) {
        duplicateField = fields[0]; // Assuming there's only one field in the index
      }
    }

    const dynamicErrorMessage = `Duplicate ${duplicateField} (${keyValue[duplicateField]})`;
    message = dynamicErrorMessage;
    errorMessages = [
      {
        path: '',
        message: 'Duplicate key error',
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? error.stack : undefined,
  })
  next()
}

export default globalErrorHandler
