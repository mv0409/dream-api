import { Express } from 'express';
import { dreamRouter } from '../entities/dream/dream.route';

export const loadRoutes = (app: Express) => {
  app.use(dreamRouter);
};
