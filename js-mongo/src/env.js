const dotenv = require('dotenv')

dotenv.config()

const env = {
    app: {
        port: Number(process.env.APP_PORT) || 3001
    }
}

module.exports = env