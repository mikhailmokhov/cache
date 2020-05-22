import express, {Request, Response, Router} from 'express'
import {Application} from 'express'
import bodyParser from "body-parser"

import * as errorHandler from './helpers/errorHandler'
import apiV1 from './apiV1/index'

export default class App {
    private app: Application
    private readonly port: number
    private readonly memoryLimit: number
    private healthRoutes: Router


    constructor(appInit: { port: number, memoryLimit: number }) {
        this.app = express()
        this.port = appInit.port
        this.memoryLimit = appInit.memoryLimit
        this.initHealthRoutes()
        this.setMiddlewares()
        this.setRoutes()
        this.catchErrors()
    }

    public initHealthRoutes() {
        this.healthRoutes = Router()
        this.healthRoutes.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                memoryUsage: process.memoryUsage(),
                heapULimit: this.memoryLimit
            })
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }

    private setMiddlewares(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: false}))
    }

    private catchErrors(): void {
        this.app.use(errorHandler.notFound)
        this.app.use(errorHandler.internalServerError)
    }

    private setRoutes(): void {
        this.app.use('/v1', apiV1)
        this.app.use('/', this.healthRoutes)
    }

}