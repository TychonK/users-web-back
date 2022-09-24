import jwt from 'jsonwebtoken'
import Users from '../../repository/auth'

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService { 
    async userExists(email) {
        const user = await Users.findByEmail(email)
        return !!user
    }

    async create(body) {
        const { id, email, subscription } = await Users.create(body)
        console.log(subscription)
        return { id, email, subscription }
    }

    async getUser(email, password) {
        const user = await Users.findByEmail(email)
        const isValidPassword = await user?.isValidPassword(password)
        if (!isValidPassword) {
            return null
        }
        return user
    }

    getToken(user) {
        const id = user.id
        const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
        return token
    }

    async setToken(id, token) {
        await Users.updateToken(id, token)
    }
    
    async setTimeLogged(id, date) {
        await Users.updateTime(id, date)
    }
}

export default AuthService