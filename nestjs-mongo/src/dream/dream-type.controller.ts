import { Controller, Get } from '@nestjs/common';
import { dreamType } from './schema/dream-schema';

@Controller('dream-type')
export class DreamTypeController {
	@Get('/')
	dreamType() {
		return dreamType;
	}
}
