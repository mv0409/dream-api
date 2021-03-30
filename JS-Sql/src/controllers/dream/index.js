import AllDreamTypesController from './all-dream.types.controller';
import { CreateDreamController } from './create-dream.controller';
import { DeleteDreamController } from './delete-dream.controller';
import { ReadDreamController } from './read-dream.controller';
import { UpdateDreamController } from './update-dream.controller';

const allDreamTypes = AllDreamTypesController();
const createDream = CreateDreamController();
const deleteDream = DeleteDreamController();
const updateDream = UpdateDreamController();
const allDreams = ReadDreamController();

export { allDreamTypes, createDream, deleteDream, updateDream, allDreams };
