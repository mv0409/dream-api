import { ControllerInterface } from '../../helpers/interfaces/controller.interface';
import { AllDreamTypesController } from './all-dream-types.controller';
import { CreateDreamController } from './create-dream-controller';
import { DeleteDreamController } from './delete-dream-controller';
import { ReadDreamController } from './read-dream-controller';
import { SearchDreamController } from './search-dream.controller';
import { UpdateDreamController } from './update-dream-controller';

class DreamController {
	getAllDreamTypes(): ControllerInterface {
		return AllDreamTypesController();
	}
	createDream(): ControllerInterface {
		return CreateDreamController();
	}
	updateDream(): ControllerInterface {
		return UpdateDreamController();
	}
	deleteDream(): ControllerInterface {
		return DeleteDreamController();
	}
	readDream(): ControllerInterface {
		return ReadDreamController();
	}
	searchDream(): ControllerInterface {
		return SearchDreamController();
	}
}

export default DreamController;
