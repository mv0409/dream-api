import { Test, TestingModule } from '@nestjs/testing';
import { DreamTypeController } from '../../src/dream/dream-type.controller';

describe('DreamTypeController', () => {
	let controller: DreamTypeController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DreamTypeController],
		}).compile();

		controller = module.get<DreamTypeController>(DreamTypeController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
