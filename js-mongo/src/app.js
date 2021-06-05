const express = require('express')
const env = require('./env')
const router = require('./routes/routes')

class App {
    constructor(
    ) {
        this.app = express()
        this.initMiddlewares()
        this.initRoutes()
    }

    initMiddlewares() {
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ extended: true }));
    }

    initRoutes() {
        this.app.use(router)
    }

    initDatabase() {

    }

    init() {
        this.app.listen(env.app.port, () => {
            console.log(`server run on ${env.app.port}`)
        })
    }
}

module.exports = App
