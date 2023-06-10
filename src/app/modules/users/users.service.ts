import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { generateUserId } from './user.utils'
import { Iuser } from './users.interface'
import { User } from './users.model'

const createUser = async (user: Iuser): Promise<Iuser | null> => {
  // auto generate id

  const newId = await generateUserId()
  user.id = newId
  // default password

  if (!user.password) {
    user.password = config.default_pass as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    // console.log('user not created');

    throw new ApiError(500, 'user not created')
  }

  return createdUser
}

export const UserService = {
  createUser,
}
