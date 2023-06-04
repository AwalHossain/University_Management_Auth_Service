import { Iuser } from './users.interface'
import { User } from './users.model'

const createUser = async (user: Iuser): Promise<Iuser | null> => {
  // auto generate id

  // default password

  const createdUser = await User.create(user)

  if (!createdUser) throw new Error('User not created')

  return createdUser
}

export default {
  createUser,
}
