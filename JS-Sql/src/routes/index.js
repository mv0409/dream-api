import express from 'express';
import {
	allDreams,
	allDreamTypes,
	createDream,
	deleteDream,
	updateDream,
} from '../controllers/dream';
import expressCallback from './express-callback';

const router = express.Router();

router.get('/api/dream/all-dream-types', expressCallback(allDreamTypes));
router.get('/api/dream/read', expressCallback(allDreams));
router.post('/api/dream/create', expressCallback(createDream));
router.delete('/api/dream/:id/delete', expressCallback(deleteDream));
router.post('/api/dream/:id/update', expressCallback(updateDream));

export default router;
