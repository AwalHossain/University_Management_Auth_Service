import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'

const auth =
  (...requiredRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization
        console.log(token, 'token');

        if (!token) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized')
        }

        // verify token
        let verifiedUser = null

        verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)

        req.user = verifiedUser // add user to req object

        console.log(req.user, 'req.user');

        // use role as authguard

        if (requiredRoles.length) {
          if (!requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
          }
        }

        next()
      } catch (error) {
        next(error)
      }
    }

export default auth
