import { RequestHandler } from 'express'
import { UserService } from './users.service'

const createUser: RequestHandler = async (req, res, next) => {
  const { user } = req.body
  // console.log(user, 'user')

  try {
    const result = await UserService.createUser(user)

    res.status(201).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}
