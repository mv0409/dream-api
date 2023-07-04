import { Router } from 'express';
import {
  createDream,
  dreamTypes,
  getDreamById,
  getDreams,
  removeDream,
  updateDream
} from './dream.controller';
import { addCallbackToRouterArgs } from '../../routes/router-args';
import { dreamValidator } from './validators/dream.validator';
import { uuidParamValidator } from './validators/id.validator';
import { getDreamsValidator } from './validators/get-dreams.validator';

const dreamRouter = Router();

dreamRouter.get('/dream/type', dreamTypes);
dreamRouter.get('/dream/:id', uuidParamValidator, getDreamById);
dreamRouter.post('/dream', dreamValidator, createDream);
dreamRouter.get('/dream', getDreamsValidator, getDreams);
dreamRouter.patch('/dream/:id', uuidParamValidator, dreamValidator, updateDream);
dreamRouter.delete('/dream/:id', uuidParamValidator, removeDream);

addCallbackToRouterArgs(dreamRouter);

export { dreamRouter };
