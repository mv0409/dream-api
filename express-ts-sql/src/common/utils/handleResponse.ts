import { Response } from 'express';

export const handleResponse = (res: Response, data: any) =>
	res.status(200).send(data);
