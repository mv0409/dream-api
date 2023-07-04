import { Request } from 'express';
import { IController } from '../../common/types';
import { DREAM_TYPE } from './types';
import * as Service from './dream.service';

export const dreamTypes = async (): Promise<IController> => {
  return { statusCode: 200, resBody: Object.values(DREAM_TYPE) };
};

export const createDream = async (req: Request): Promise<IController> => {
  const data = await Service.createDream(req.body);
  return { statusCode: 201, resBody: data };
};

export const getDreamById = async (req: Request): Promise<IController> => {
  const data = await Service.getDreamById(req.params.id);
  return { statusCode: 200, resBody: data };
};

export const getDreams = async (req: Request): Promise<IController> => {
  const data = await Service.getDreams(req);
  return { statusCode: 200, resBody: data };
};

export const updateDream = async (req: Request): Promise<IController> => {
  const data = await Service.updateDream(req.params.id, req.body);
  return { statusCode: 200, resBody: data };
};

export const removeDream = async (req: Request): Promise<IController> => {
  await Service.removeDream(req.params.id);
  return { statusCode: 204 };
};
