import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
	use(
		@Req() req: Request,
		@Res() _res: Response,
		@Next() next: NextFunction,
	) {
		console.info(
			`TIME: [${new Date().toISOString()}] - ` +
				`METHOD: [${req.method}] - ` +
				`URL: [${req.url}] - ` +
				`STATUS: [${req.statusCode}] - ` +
				`IP: [${req.socket.remoteAddress}] `,
		);
		next();
	}
}
