import { Test, TestingModule } from '@nestjs/testing';
import { DreamService } from '../../src/dream/dream.service';

describe('DreamService', () => {
	let service: DreamService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DreamService],
		}).compile();

		service = module.get<DreamService>(DreamService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
