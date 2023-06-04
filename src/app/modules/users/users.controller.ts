import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const result = await usersService.createUser(user)

    res.status(201).json({ data: result })
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
