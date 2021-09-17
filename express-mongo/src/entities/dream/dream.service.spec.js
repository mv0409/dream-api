'use strict';

const DreamServce = require('./dream.service');
const { Types } = require('mongoose');
const { Dream } = require('./models/dream');

describe('🧪 Dream service test', () => {
	let service = DreamServce;

	// mock dream document
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

	it('should find a dream document by id', async () => {
		// create dream document
		const dream = mockDreamDoc();
		// spy on findOne function in model and return value
		jest.spyOn(Dream, 'findOne').mockReturnValueOnce(dream)
		// call service method
		const result = await service.findOne(dream._id);
		expect(result).toBeDefined();
		// check value 
		expect(result._id).toEqual(dream._id);
	});

	it('should throw an error document for unknown id', async () => {
		// create dream document
		const dream = mockDreamDoc();
		// spy on findOne function in model and return value
		jest.spyOn(Dream, 'findOne').mockReturnValueOnce(undefined)
		// check error
		expect(async () => {
			try {
				await service.findOne(dream._id)
			} catch (error) {
				expect(error.message).toBe(`Dream with id: ${dream._id} not found`);
			}
		})
	})

	it('should create a dream and return document', async () => {
		//create dream dto
		const dreamDto = {
			title: 'best title',
			description: 'best description',
			type: 'happy',
			date: '2021-11-11'
		}
		// spy on create function in model and return value
		jest.spyOn(Dream, 'create').mockReturnValueOnce(dreamDto)
		// call service method
		const result = await service.create(dreamDto)
		// check value
		expect(result.title).toEqual(dreamDto.title);
	})

	it('should throw an error if document is not created', async () => {
		//create dream dto
		const dreamDto = {
			title: 'best title',
			description: 'best description',
			type: 'happy',
			date: '2021-11-11'
		}
		// spy on creaet function in model and return value
		jest.spyOn(Dream, 'create').mockReturnValueOnce(undefined)
		// check error
		expect(async () => {
			try {
				await service.create(dreamDto)
			} catch (error) {
				expect(error.message).toBe(`Dream not created`);
			}
		})
	})

	it('should update a dream and return new document', async () => {
		//create dream dto
		const dreamDto = {
			_id: Types.ObjectId(),
			title: 'best title',
			description: 'best description',
			type: 'happy',
			date: '2021-11-11'
		}
		// spy on findOneAndUpdate function in model and return value
		jest.spyOn(Dream, 'findOneAndUpdate').mockReturnValueOnce(dreamDto)
		// call service method
		const result = await service.update(dreamDto._id, dreamDto)
		// check value
		expect(result.title).toEqual(dreamDto.title);
	})

	it('should throw an error if document is not updated', async () => {
		//create dream dto
		const dreamDto = {
			_id: Types.ObjectId(),
			title: 'best title',
			description: 'best description',
			type: 'happy',
			date: '2021-11-11'
		}
		// spy on findOneAndUpdate function in model and return value
		jest.spyOn(Dream, 'findOneAndUpdate').mockReturnValueOnce(undefined)
		// check error
		expect(async () => {
			try {
				await service.update(dreamDto._id)
			} catch (error) {
				expect(error.message).toBe(`Dream not created`);
			}
		})
	})

	it('should delete a dream and return deleted document', async () => {
		//create dream dto
		const dreamDto = {
			_id: Types.ObjectId(),
			title: 'best title',
			description: 'best description',
			type: 'happy',
			date: '2021-11-11'
		}
		// spy on findByIdAndRemove function in model and return value
		jest.spyOn(Dream, 'findByIdAndRemove').mockReturnValueOnce(dreamDto)
		// call service method
		const result = await service.delete(dreamDto._id)
		// check value
		expect(result.title).toEqual(dreamDto.title);
	})

	it('should throw an error if document is not deleted', async () => {
		//create dream dto
		const dreamDto = {
			_id: Types.ObjectId(),
			title: 'best title',
			description: 'best description',
			type: 'happy',
			date: '2021-11-11'
		}
		// spy on findOneAndUpdate function in model and return value
		jest.spyOn(Dream, 'findOneAndUpdate').mockReturnValueOnce(undefined)
		// check error
		expect(async () => {
			try {
				await service.delete(dreamDto._id)
			} catch (error) {
				expect(error.message).toBe(`Dream with id: ${_id} not found and deleted`);
			}
		})
	})


});
