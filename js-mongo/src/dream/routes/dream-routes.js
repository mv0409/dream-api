const express = require('express')
const controller = require('../controllers')
const cb = require('../../middlewares/express-callback')

const dreamRouter = express.Router()

dreamRouter.post('/dream' , cb(controller.createDream))
dreamRouter.delete('/dream/:id', cb(controller.deleteDream))
dreamRouter.get('/dream-type', cb(controller.dreamTypes))
dreamRouter.get('/dream/:id', cb(controller.getDream))
dreamRouter.put('/dream/:id', cb(controller.updateDream))

module.exports = dreamRouter