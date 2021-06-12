import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	Query,
	UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';
import { DreamService } from './dream.service';

@Controller('dream')
@UseInterceptors(BenchmarkInterceptor)
export class DreamController {
	constructor(private readonly dreamService: DreamService) {}

	@Get('/')
	find(
		@Query('startDate') startDate: string,
		@Query('endDate') endDate: string,
		@Query('page') page: string,
		@Query('limit') limit: string,
		@Query('type') type: string,
		@Query('title') title: string,
	) {
		return this.dreamService.find(
			startDate,
			endDate,
			page,
			limit,
			type,
			title,
		);
	}

	@Post('/')
	create(@Req() req: Request) {
		return this.dreamService.create(req.body);
	}

	@Put('/:id')
	update(@Req() req: Request, @Param('id') id: string) {
		return this.dreamService.update(id, req.body);
	}

	@Get('/:id')
	findOne(@Param('id') id: string) {
		return this.dreamService.findOne(id);
	}

	@Delete('/:id')
	remove(@Param('id') id: string) {
		return this.dreamService.remove(id);
	}
}
