import { Router } from 'express'
import items from './items/items.route'

const router: Router = Router()

router.use('/items', items)

export default router