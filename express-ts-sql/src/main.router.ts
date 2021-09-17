import { Router } from "express"
import DreamRouter from "./dream/dream.router"

class MainRouter {

    private _router = Router()
    private _subrouterDream = DreamRouter
    constructor() {
        this._configure()
    }

    get router() {
        return this._router
    }

    _configure() {
        this._router.use('/dream', this._subrouterDream)
    }


}

export default new MainRouter().router