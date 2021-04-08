import { AllDreamTypesController } from './all-dream.types.controller';
import { CreateDreamController } from './create-dream.controller';
import { DeleteDreamController } from './delete-dream.controller';
import { SearchDreamController } from './search-dream.controller';
import { UpdateDreamController } from './update-dream.controller';

const allDreamTypes = AllDreamTypesController();
const createDream = CreateDreamController();
const deleteDream = DeleteDreamController();
const updateDream = UpdateDreamController();
const searchDream = SearchDreamController();

export { allDreamTypes, createDream, deleteDream, updateDream, searchDream };
