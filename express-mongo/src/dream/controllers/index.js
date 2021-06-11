const { createDreamController } = require('./create-dream');
const { deleteDreamController } = require('./delete-dream');
const { getDreamController } = require('./get-dream');
const { getDreamTypesController } = require('./get-dream-types');
const { updateDreamController } = require('./update-dream');
const { getDreamsController } = require('./get-dreams');

const getDreams = getDreamsController();
const createDream = createDreamController();
const deleteDream = deleteDreamController();
const dreamTypes = getDreamTypesController();
const getDream = getDreamController();
const updateDream = updateDreamController();

module.exports = {
	getDreams,
	createDream,
	deleteDream,
	dreamTypes,
	getDream,
	updateDream,
};
