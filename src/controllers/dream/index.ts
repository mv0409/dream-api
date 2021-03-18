import { AllDreamTypesController } from './all-dream-types.controller';
import { CreateDreamController } from './create-dream-controller';
import { DeleteDreamController } from './delete-dream-controller';
import { ReadDreamController } from './read-dream-controller';
import { UpdateDreamController } from './update-dream-controller';

class DreamController {
	getAllDreamTypes() {
		return AllDreamTypesController();
	}
	createDream() {
		return CreateDreamController();
	}
	updateDream() {
		return UpdateDreamController();
	}
	deleteDream() {
		return DeleteDreamController();
	}
	readDream() {
		return ReadDreamController();
	}
}

export default DreamController;
