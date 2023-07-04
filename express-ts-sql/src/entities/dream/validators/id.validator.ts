import joi from 'joi';
import { throwBadRequestError } from '../../../common/error/http-error';
import { Request } from 'express';

export const uuidParamValidator = async (req: Request) => {
  try {
    const schema = joi.object({
      id: joi.string().uuid().required()
    });

    await schema.validateAsync(req.params);
  } catch (error: any) {
    throwBadRequestError(error.message);
  }
};
