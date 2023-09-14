import { User } from './users.model'

const findLastUserId = async () => {
  // find the last user id in the database
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUserId?.id
}

export const generateUserId = async () => {
  // create 5 digit user id and increment by 1
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')

  const newId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return newId
}
