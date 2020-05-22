import {Request, Response} from 'express'
import ItemsService from '../../services/items.service'

export default class ItemsController {
    private itemsService: ItemsService

    constructor(itemsService: ItemsService) {
        this.itemsService = itemsService
    }

    public getAll = async (req: Request, res: Response): Promise<any> => {
        res.status(200).send(this.itemsService.getAll())
    }

    public add = async (req: Request, res: Response): Promise<any> => {
        const key: string = this.itemsService.add(req.body)
        if (key == null) {
            // Cache is empty and
            res.status(507).send({
                message: "Out of memory"
            })
        } else {
            res.status(200).send({
                'key': key
            })
        }
    }

    public get = async (req: Request, res: Response): Promise<any> => {
        const value: object = this.itemsService.get(req.params.id)
        if (value) {
            res.status(200).send({
                data: value
            })
        } else {
            res.status(404).send({
                message: "Not found"
            })
        }
    }

    public delete = async (req: Request, res: Response): Promise<any> => {
        if (this.itemsService.remove(req.params.id)) {
            res.status(200).send({
                message: "Removed"
            })
        } else {
            res.status(404).send({
                message: "Not found"
            })
        }
    }
}