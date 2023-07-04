import { Request } from 'express';
import joi from 'joi';
import { throwBadRequestError } from '../../../common/error/http-error';
import { DREAM_TYPE } from '../types';

export const getDreamsValidator = async (req: Request) => {
  try {
    const schema = joi.object({
      page: joi.number().required(),
      limit: joi.number().required(),
      startDate: joi.string().isoDate().optional(),
      endDate: joi.string().isoDate().optional(),
      title: joi.string().optional(),
      type: joi
        .string()
        .valid(DREAM_TYPE.EXCITING, DREAM_TYPE.HAPPY, DREAM_TYPE.SAD, DREAM_TYPE.SCARY)
        .optional()
    });

    await schema.validateAsync(req.query);
  } catch (error: any) {
    throwBadRequestError(error.message);
  }
};
