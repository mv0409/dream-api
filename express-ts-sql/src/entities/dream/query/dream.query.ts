import { Request } from 'express';
import { DREAM_TYPE } from '../types';
import { Between, MoreThanOrEqual, LessThanOrEqual, FindOptionsWhere } from 'typeorm';
import { Dream } from '../dream.entity';

export const getDreamsQuery = (req: Request) => {
  const startDate = (req.query.startDate as string) || undefined;
  const endDate = (req.query.endDate as string) || undefined;
  const dreamType = (req.query.type as DREAM_TYPE) || undefined;
  const dreamTitle = (req.query.title as string) || undefined;

  let dreamQuery: FindOptionsWhere<Dream> = {};

  if (startDate) {
    dreamQuery = endDate
      ? { date: Between(new Date(startDate), new Date(endDate)) }
      : { date: MoreThanOrEqual(new Date(startDate)) };
  } else if (endDate) {
    dreamQuery = { date: LessThanOrEqual(new Date(endDate)) };
  }

  if (dreamType) dreamQuery = { ...dreamQuery, type: dreamType };
  if (dreamTitle) dreamQuery = { ...dreamQuery, title: dreamTitle };

  return dreamQuery;
};
