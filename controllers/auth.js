import User from "../model/user"
import HttpCode from "../lib/constants"

import AuthService from "../service/auth"
const authService = new AuthService()

const registration = async (req, res, next) => {
    const { email } = req.body
    const userExists = await authService.userExists(email)
    if (userExists) {
        return res.status(HttpCode.CONFLICT).json({status: 'error', code: HttpCode.CONFLICT, message: 'This email already exists'})
    }

    const data = await authService.create(req.body)
    res.status(HttpCode.OK).json({status: 'OK', code: HttpCode.OK, data})
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if (!user) {
        return res.status(HttpCode.UNAUTHORIZED).json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
    } else if (!user.active) {
        return res.status(HttpCode.UNAUTHORIZED).json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'HAHAHAHA you were blockeeed!' })
    }
    

    const token = authService.getToken(user)
    await authService.setToken(user.id, token)
    await authService.setTimeLogged(user.id, Date.now())

    res.status(HttpCode.OK).json({
        status: 'OK', code: HttpCode.OK, data:
        {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }
    })
}

const logout = async (req, res, next) => {
    await authService.setToken(req.user.id, null)

    res.status(HttpCode.NO_CONTENT).json({status: 'NO_CONTENT', code: HttpCode.NO_CONTENT, data: {}})
}

export { registration, login, logout }