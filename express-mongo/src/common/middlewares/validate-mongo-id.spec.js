const { response } = require('express');
const validateMongoId = require('./validate-mongo-id');
const mongoose = require('mongoose');

describe('🧪 Validate dream mongo id middleware test', () => {
	// dynamic mock of req.params.id
	const mockReq = (id) => ({
		params: {
			id: id || undefined,
		},
	});
	// mock response with express response
	const mockRes = response;

	// mock nextFunction
	const mockedNext = jest.fn();

	beforeEach(() => {
		// clear express response from prevouis test call
		mockRes.locals = undefined;
		// clear mock calls
		mockedNext.mockClear();
	});

	it('should call next function if req.params.id is provided', () => {
		// create valid mongo id
		const id = mongoose.Types.ObjectId().toHexString();
		// create request
		const mockedReq = mockReq(id);
		// create response
		const mockedRes = mockRes;
		// call middleware
		validateMongoId(mockedReq, mockedRes, mockedNext);
		// check params id exists
		expect(mockedReq.params.id).toBeDefined();
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// check req.params.id by value and type
		expect(mockedReq.params.id).toEqual(mongoose.Types.ObjectId(id));
	});

	it('should throw an error if req.params.id not provided', () => {
		// create request
		const mockedReq = mockReq();
		// create response
		const mockedRes = mockRes;
		// call middleware and catch error
		expect(() => {
			try {
				validateMongoId(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe(`Include id param in request`);
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});

	it('should throw an error if req.params.id not valid mongo id', () => {
		// create invalid mongo id
		const id = mongoose.Types.ObjectId()
			.toHexString()
			.slice(0, mongoose.Types.ObjectId().toHexString().length - 1);
		// create request
		const mockedReq = mockReq(id);
		// create response
		const mockedRes = mockRes;
		// call middleware and catch error
		expect(() => {
			try {
				validateMongoId(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe(`Not valid mongo id`);
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});
});
