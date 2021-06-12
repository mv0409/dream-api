import { createDreamController } from './create-dream';
import { deleteDreamController } from './delete-dream';
import { getDreamController } from './get-dream';
import { dreamTypesController } from './get-dream-types';
import { getDreamsController } from './get-dreams';
import { updateDreamController } from './update-dream';

const createDream = createDreamController();
const deleteDream = deleteDreamController();
const dreamTypes = dreamTypesController();
const getDream = getDreamController();
const getDreams = getDreamsController();
const updateDream = updateDreamController();

export default {
	createDream,
	deleteDream,
	dreamTypes,
	getDream,
	getDreams,
	updateDream,
};
