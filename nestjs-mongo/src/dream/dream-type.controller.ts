import { Controller, Get } from '@nestjs/common';
import { DreamType } from './dream.model';

@Controller('dream-type')
export class DreamTypeController {
	@Get('/')
	dreamType() {
		return DreamType;
	}
}
