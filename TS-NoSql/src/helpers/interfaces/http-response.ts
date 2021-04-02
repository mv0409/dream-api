import { PagionationInterface } from './pagination.interface';

/*eslint @typescript-eslint/no-explicit-any:*/
export interface HttpResponse {
	headers: any;
	statusCode: number;
	payload?: {
		success?: boolean;
		error?: string;
		data?: any;
		message?: string;
		pagination?: PagionationInterface;
		count?: number;
	};
	cookie?: string;
	clearCookie?: string;
}
