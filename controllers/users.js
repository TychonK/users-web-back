import HttpCode from "../lib/constants"
import repositoryContacts from '../repository/users'

const listUsers = async (req, res, next) => {
    const contacts = await repositoryContacts.listUsers()
    res.status(200).json({ status: 'success', code: HttpCode.OK, data: contacts } )
}

const blockUsers = async (req, res, next) => {
    const { id: usersId } = req.body
    const usersBlocked = await repositoryContacts.blockUsers(usersId)
    console.log(usersBlocked)
    usersBlocked.matchedCount === 0 || usersBlocked.matchedCount !== usersId.length ? res.status(404).json({ message: "No users with such id found" }) : res.status(200).json({message: `${usersBlocked.matchedCount} users blocked`})
}

const unblockUsers = async (req, res, next) => {
    const { id: usersId } = req.body
    const usersUnblocked = await repositoryContacts.unblockUsers(usersId)
    console.log(usersUnblocked)
    usersUnblocked.matchedCount === 0 || usersUnblocked.matchedCount !== usersId.length ? res.status(404).json({ message: "No users with such id found" }) : res.status(200).json({message: `${usersUnblocked.matchedCount} users unblocked`})
}

const removeUsers = async (req, res, next) => {
    const { id: usersId } = req.body
    const user = await repositoryContacts.removeUsers(usersId)
    console.log(user)
    user.deletedCount === 0 ? res.status(404).json({ message: "No users with such id found" }) : res.status(200).json({message: `${user.deletedCount} users deleted`})
}

export { listUsers, blockUsers, unblockUsers, removeUsers }