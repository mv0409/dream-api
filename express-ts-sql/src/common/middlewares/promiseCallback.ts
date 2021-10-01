import { Request, Response } from 'express';
import { handleError } from '../utils/handleError';
import { handleResponse } from '../utils/handleResponse';

export const callback = (controller: any) => {
	return (req: Request, res: Response) => {
		controller(req, res)
			.then((data: any) => {
				handleResponse(res, data);
			})
			.catch((error: any) => {
				handleError(res, error);
			});
	};
};
