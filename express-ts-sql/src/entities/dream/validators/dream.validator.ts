import { Request } from 'express';
import joi from 'joi';
import { throwBadRequestError } from '../../../common/error/http-error';
import { DREAM_TYPE } from '../types';

export const dreamValidator = async (req: Request) => {
  try {
    const schema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      date: joi.string().isoDate(),
      type: joi
        .string()
        .valid(DREAM_TYPE.EXCITING, DREAM_TYPE.HAPPY, DREAM_TYPE.SAD, DREAM_TYPE.SCARY)
    });

    await schema.validateAsync(req.body);
  } catch (error: any) {
    throwBadRequestError(error.message);
  }
};
