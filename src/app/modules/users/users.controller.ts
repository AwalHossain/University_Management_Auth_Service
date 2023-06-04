import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  const { user } = req.body
  console.log(user, 'user')

  try {
    const result = await usersService.createUser(user)

    res
      .status(201)
      .json({
        success: true,
        message: 'user created successfully!',
        data: result,
      })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    })
  }
}

export default {
  createUser,
}
