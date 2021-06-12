import { Test, TestingModule } from '@nestjs/testing';
import { DreamController } from '../../src/dream/dream.controller';
describe('DreamController', () => {
	let controller: DreamController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DreamController],
		}).compile();

		controller = module.get<DreamController>(DreamController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
