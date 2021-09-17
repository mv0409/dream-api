import { Router } from "express"

class DreamRouter {

    _router = Router()
    constructor() {
        this._configure()
    }

    get router() {
        return this._router
    }

    _configure() {

    }
}

export default new DreamRouter().router