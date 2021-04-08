import express from 'express';
import * as dream from '../controllers/dream';
import cb from '../middlewares/express-callback';

const router = express.Router();

router.get('/api/dream/types', cb(dream.allDreamTypes));
router.post('/api/dream', cb(dream.createDream));
router.get('/api/dreams', cb(dream.searchDream));
router.delete('/api/dream/:id', cb(dream.deleteDream));
router.patch('/api/dream/:id', cb(dream.updateDream));

export default router;
