import { Request } from 'express';
import { AppDataSource } from '../../db/ormconfig';
import { Dream } from './dream.entity';
import { throwNotFoundError } from '../../common/error/http-error';
import { Repository } from 'typeorm';
import { IDream } from './types';
import { getDreamsQuery } from './query/dream.query';

const dreamRepo = AppDataSource.getRepository(Dream);

export const createDream = async (createDreamDto: IDream) => {
  return dreamRepo.save(createDreamDto);
};

export const getDreamById = async (id: string) => {
  return findDreamByIdorThrow(dreamRepo, id);
};

export const getDreams = async (req: Request) => {
  const queryObj = getDreamsQuery(req);
  const [result, count] = await Promise.all([
    dreamRepo.find({
      where: queryObj,
      skip: (Number(req.query.page) - 1) * Number(req.query.limit),
      take: Number(req.query.limit)
    }),
    dreamRepo.count({ where: queryObj })
  ]);
  return { result, count };
};

export const updateDream = async (id: string, updateDreamDto: IDream) => {
  await findDreamByIdorThrow(dreamRepo, id);
  return dreamRepo.save({ id, ...updateDreamDto });
};

export const removeDream = async (id: string) => {
  await findDreamByIdorThrow(dreamRepo, id);
  return dreamRepo.delete({ id });
};

const findDreamByIdorThrow = async (dreamRepo: Repository<Dream>, id: string) => {
  const found = await dreamRepo.findOneBy({ id });
  if (!found) throwNotFoundError('Dream not found');
  return found;
};
