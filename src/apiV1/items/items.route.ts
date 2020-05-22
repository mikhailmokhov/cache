import {Router} from 'express'
import ItemsController from './items.controller'
import ItemsService from "../../services/items.service"

const items: Router = Router()
const itemsController = new ItemsController(new ItemsService())

items.post('/', itemsController.add)
items.get('/:id', itemsController.get)
items.delete('/:id', itemsController.delete)

// Method is used for testing
items.get('/', itemsController.getAll)

export default items