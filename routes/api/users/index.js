import { Router } from 'express'

import { validateId } from './validation'
import { listOne, listUsers, blockUsers, unblockUsers, removeUsers } from '../../../controllers/users'

import guard from '../../../middlewares/guard' 

const router = new Router()

router.get('/', guard, listUsers)

router.get('/current', guard, listOne)

router.patch('/block', [guard, validateId], blockUsers)

router.patch('/unblock',  [guard, validateId], unblockUsers)

router.put('/delete', [guard, validateId], removeUsers)


export default router
