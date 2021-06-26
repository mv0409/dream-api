import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Req,
	Query,
	UseInterceptors,
	Body,
	Patch,
} from '@nestjs/common';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';
import { DreamService } from './dream.service';
import { CreateDreamDto } from './dto/create-dream.dto';
import { updateDreamDto } from './dto/update-dream.dto';

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
	create(@Body() createDream: CreateDreamDto) {
		return this.dreamService.create(createDream);
	}

	@Patch('/:id')
	update(@Body() update, @Param('id') id: string) {
		return this.dreamService.update(id, updateDreamDto);
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
