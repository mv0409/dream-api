import express, { Response } from 'express'
import config from './config.default'
import MainRouter from './main.router'

class App {
    private _app = express()
    private static _Instance : App
    private _router = MainRouter

    constructor() {
        // init middlewares in order
        this._app.use(express.json({limit: '50mb'}))
        this._app.use(express.urlencoded({extended: true}))

        // public routes 
        this._app.use('/public', (res: Response) => {
            res.status(200).send({success: true})
        })

        // private routes
        this._app.use('/', this._router)

        // endpoint not found error handle
        this._app.use((res: Response) => {
            res.status(404).send({error: 'endpoint not found'})
        })
        
    }

    // return single instance
    public static getInstace () {
        if(!App._Instance) App._Instance = new App()
        return App._Instance
    }

    public listen(port: number) {
        App._Instance._app.listen(port, () => {
            console.log('🚀 Dream server started: ', config.publicDomain)
        })
    }

}

export default new App()