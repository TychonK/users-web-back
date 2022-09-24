import HttpCode from "../lib/constants"
import repositoryUsers from '../repository/users'

const listUsers = async (req, res, next) => {
    const users = await repositoryUsers.listUsers()
    res.status(200).json({ status: 'success', code: HttpCode.OK, data: users } )
}

const listOne = async (req, res, next) => {
    const user = await repositoryUsers.listOne(req.headers.authorization.substring(7))
    if (!user) {
        res.status(HttpCode.BAD_REQUEST).json({ status: 'failure', code: HttpCode.BAD_REQUEST, message: `no user found` } )
    } else {
        res.status(200).json({ status: 'success', code: HttpCode.OK, user: user } )
    }
}

const blockUsers = async (req, res, next) => {
    const { id: usersId } = req.body
    const usersBlocked = await repositoryUsers.blockUsers(usersId)
    console.log(usersBlocked)
    usersBlocked.matchedCount === 0 || usersBlocked.matchedCount !== usersId.length ? res.status(404).json({ message: "No users with such id found" }) : res.status(200).json({message: `${usersBlocked.matchedCount} users blocked`})
}

const unblockUsers = async (req, res, next) => {
    const { id: usersId } = req.body
    const usersUnblocked = await repositoryUsers.unblockUsers(usersId)
    console.log(usersUnblocked)
    usersUnblocked.matchedCount === 0 || usersUnblocked.matchedCount !== usersId.length ? res.status(404).json({ message: "No users with such id found" }) : res.status(200).json({message: `${usersUnblocked.matchedCount} users unblocked`})
}

const removeUsers = async (req, res, next) => {
    const { id: usersId } = req.body
    const user = await repositoryUsers.removeUsers(usersId)
    console.log(user)
    user.deletedCount === 0 ? res.status(404).json({ message: "No users with such id found" }) : res.status(200).json({message: `${user.deletedCount} users deleted`})
}

export { listUsers, blockUsers, unblockUsers, removeUsers, listOne }