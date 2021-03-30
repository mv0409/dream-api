import { PagionationInterface } from './pagination.interface';

export interface HttpResponse {
	headers: any;
	statusCode: number;
	payload?: {
		success?: boolean;
		error?: string;
		data?: any;
		message?: string;
		pagination?: PagionationInterface;
	};
	cookie?: string;
	clearCookie?: string;
}
