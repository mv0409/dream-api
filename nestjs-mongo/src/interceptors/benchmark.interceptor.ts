import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BenchmarkInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const req: Request = ctx.getRequest();
		const res: Response = ctx.getResponse();
		const now = Date.now();
		return next.handle().pipe(
			tap(() => {
				console.info(
					`EXECUTION TIME: [${Date.now() - now}ms] ` +
						`METHOD: [${req.method}] -` +
						`URL: [${req.url}] - ` +
						`STATUS: [${res.statusCode}] - ` +
						`IP: [${req.socket.remoteAddress}] `,
				);
			}),
		);
	}
}
