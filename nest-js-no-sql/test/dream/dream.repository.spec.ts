import { Test, TestingModule } from '@nestjs/testing';
import { DreamRepository } from '../../src/dream/dream.repository';

describe('DreamRepository', () => {
	let service: DreamRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DreamRepository],
		}).compile();

		service = module.get<DreamRepository>(DreamRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
