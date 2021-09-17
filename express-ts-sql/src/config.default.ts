import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export default {
    port : Number(process.env.PORT) || 3000,
    publicDomain: process.env.PUBLICDOMAIN || 'localhost:3000'
}