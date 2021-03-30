import { Request } from 'express';
import { HttpResponse } from './http-response';

export interface ControllerInterface {
	(req: Request): Promise<HttpResponse>;
}
