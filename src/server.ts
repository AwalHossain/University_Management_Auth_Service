import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

// Handle uncaught exceptions  - synchronous errors that occur during the execution of the program that are not handled by try/catch blocks
process.on('uncaughtException', error => {
  console.log(`unhandledRejection, we are closing server....`)
  errorLogger.error('error', error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string)

    app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('error', error)
  }

  // Handle unhandled promise rejections - asynchronous errors that occur during the execution of the program that are not handled by try/catch blocks
  process.on('unhandledRejection', error => {
    console.log(`unhandledRejection, we are closing server....`)

    if (server) {
      server.close(() => {
        errorLogger.error('error', error)
        process.exit(1)
      })
    } else {
      errorLogger.error('error', error)
      process.exit(1)
    }
  })
}

bootstrap()

// console.log(x);

// shutdown gracefully  - SIGTERM is the signal that tells a process to gracefully shut down

process.on('SIGTERM', () => {
  if (server) {
    server.close()
  }
})
