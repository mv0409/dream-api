'use strict';

const DreamServce = require('./dream.service');
const { Types } = require('mongoose');
const { Dream } = require('./models/dream');

describe('🧪 Dream service test', () => {
	let service = DreamServce;

	let mockDreamDoc = (mock) => ({
		_id: Types.ObjectId(),
		title: mock?.title || 'Title number 1',
		description: mock?.description || 'Description number 1',
		date: mock?.date || new Date('2017-12-12T00:00:00.000+00:00'),
		type: mock?.type || 'happy',
	});

	it('should define dream service', () => {
		expect(service).toBeDefined();
	});

	// it('should find a dream document by id', async () => {
	// 	const dream = mockDreamDoc();
	// 	jest.spyOn(Dream, 'findOne').mockReturnValueOnce(dream)
	// 	const result = await service.findOne(dream._id);
	// 	expect(result).toBeDefined();
	// 	expect(result._id).toEqual(dream._id);
	// });

	// it('should throw an error document for unknown id', () => {
	// 	const dream = mockDreamDoc();
	// 	jest.spyOn(Dream, 'findOne').mockReturnValueOnce(undefined)
	// 	// const result = await service.findOne(dream._id)
	// 	// expect(result).toThrow(`Dream with id: ${dream._id} not found`)
	// 	expect(async () => await service.findOne(dream._id))
	// 		.toThrow(`Dream with id: ${dream._id} not found`)
	// })
});

// const { SoundPlayer} = require('./models/__mocks__/sound-player')
// // jest.mock('../../sound-player')
// jest.mock('./sound-player')

// beforeEach(() => {
// 	// Clear all instances and calls to constructor and all methods:
// 	SoundPlayer.mockClear();
// 	// mockPlaySoundFile.mockClear();
// });

// it('We can check if the consumer called the class constructor', () => {
// 	const dreamService = new DreamServce();
// 	expect(dreamService).toBeTruthy()
// 	expect(SoundPlayer).toHaveBeenCalledTimes(1);
//   });
