import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../common/error/error-handler';
import { IRouteHandler } from '../common/types';

export const callback = (routerHandler: IRouteHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await routerHandler(req, res, next);
      if (result) {
        res.status(result.statusCode).send(result.resBody).end();
      } else {
        next();
      }
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.code).send(error.message).end();
      } else {
        res.status(500).send('Unexpected error');
      }
    }
  };
};
