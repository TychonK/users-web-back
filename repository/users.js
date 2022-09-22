import User from "../model/user"

const listUsers = async () => {
  return await User.find()
}

const blockUsers = async (usersId) => {
  const result = await User.updateMany(
    {
      _id: { $in: usersId }
    },
    { $set: { active: false } }
  )
  return result
}

const unblockUsers = async (usersId) => {
  const result = await User.updateMany(
    {
      _id: { $in: usersId }
    },
    { $set: { active: true } }
  )
  return result
}

const removeUsers = async (usersId) => {
  const userDeleted = await User.deleteMany({ _id: { $in: usersId}  })

  return userDeleted
}

export default {
  listUsers,
  blockUsers,
  unblockUsers,
  removeUsers
}
