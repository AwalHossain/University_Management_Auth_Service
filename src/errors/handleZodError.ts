import { ZodError } from 'zod'

const handZodError = (error: ZodError) => {
  const erorrs = error.issues.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: erorrs,
  }
}

export default handZodError
