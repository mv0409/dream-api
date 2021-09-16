'use strict';

const { Router } = require('express');
const DreamRouter = require('./dream/dream.router');

class MainRouter {
	_router = Router();
	_subRouterDream = DreamRouter;
	constructor() {
		this._configure();
	}

	get router() {
		return this._router;
	}

	// Connect routes to their matching routers
	_configure() {
		this._router.use('/dream', this._subRouterDream);
	}
}

module.exports = new MainRouter().router;