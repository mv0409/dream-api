const express = require('express');
const controller = require('../controllers');
const { cb } = require('../../middlewares/express-callback');
const { isValidId } = require('../../middlewares/validate-id');
const { isValidPagination } = require('../../middlewares/validate-pagination');
const { validDreamType } = require('../../middlewares/valid-dream-type');

const dreamRoutes = express.Router();

dreamRoutes.get('/dream-type', cb(controller.dreamTypes));
dreamRoutes.get('/dream', isValidPagination,validDreamType, cb(controller.getDreams));
dreamRoutes.post('/dream', cb(controller.createDream));
dreamRoutes.put('/dream/:id', isValidId, cb(controller.updateDream));
dreamRoutes.delete('/dream/:id', isValidId, cb(controller.deleteDream));
dreamRoutes.get('/dream/:id', isValidId, cb(controller.getDream));

module.exports = dreamRoutes;
