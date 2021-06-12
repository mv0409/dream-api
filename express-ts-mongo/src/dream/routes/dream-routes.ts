import express from 'express';
import { cb } from '../../middlewares/express-callback';
import { validDreamType } from '../../middlewares/valid-dream-type';
import { isValidPagination } from '../../middlewares/validate-pagination';
import controller from '../controller';

const dreamRoutes = express.Router();

dreamRoutes.get('/dream-type', cb(controller.dreamTypes));
dreamRoutes.get(
	'/dream',
	isValidPagination,
	validDreamType,
	cb(controller.getDreams),
);
dreamRoutes.post('/dream', cb(controller.createDream));
dreamRoutes.put('/dream/:id', cb(controller.updateDream));
dreamRoutes.delete('/dream/:id', cb(controller.deleteDream));
dreamRoutes.get('/dream/:id', cb(controller.getDream));

export { dreamRoutes };
