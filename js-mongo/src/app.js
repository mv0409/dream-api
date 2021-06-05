const express = require('express')
const env = require('./env')
const logger = require('./helpers/logger')
const mongoose = require('mongoose')
const dreamRouter = require('./dream/routes/dream-routes')

class App {
    constructor(
    ) {
        this.initDatabase()
        this.app = express()
        this.initMiddlewares()
        this.initRoutes()
    }

    initMiddlewares() {
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ extended: true }));
    }

    initRoutes() {
        this.app.use(dreamRouter)
    }

    async initDatabase() {
        try {
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                poolSize: 10, // Maintain up to 10 socket connections
                serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                socketTimeoutMS: 10000, // Close sockets after 45 seconds of inactivity
                family: 4, // Use IPv4, skip trying IPv6
            };
            await mongoose.connect(
                `${env.db.url}/${env.db.name}`,
                options,
            );
            logger.info('SERVER', 'CONNECTED TO MONGODB');
        } catch (error) {
            logger.error('SERVER', error.message, error);
        }
    }

    init() {
        this.app.listen(env.app.port, () => {
            logger.info('SERVER', `APP IS RUNNING ${env.app.port}`);
        })
    }
}

module.exports = App
