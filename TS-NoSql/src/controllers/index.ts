import DreamController from './dream';

const dreamController = new DreamController();

export default class Controllers {
	dreamController;
	constructor(dreamController: DreamController) {
		this.dreamController = dreamController;
	}
}

export const controllers = new Controllers(dreamController);
