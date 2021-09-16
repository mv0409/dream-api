const { response } = require('express');
const validatePagination = require('./validate-pagination');

describe('🧪 Validate dream pagination middleware test', () => {
	// dynamic mock of req.params.id
	const mockReq = ({ page, limit }) => ({
		query: {
			page: page || undefined,
			limit: limit || undefined,
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

	it('should call next function if req.params.page and limit are provided', () => {
		// create request
		const mockedReq = mockReq({ page: 1, limit: 2 });
		// create response
		const mockedRes = mockRes;
		// call middleware
		validatePagination(mockedReq, mockedRes, mockedNext);
		// check params id exists
		expect(mockedReq.query).toBeDefined();
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// check req.query.page by value and type
		expect(mockedReq.query.page).toEqual(1);
		// check req.query.limit by value and type
		expect(mockedReq.query.limit).toEqual(2);
	});

	it('should throw an error if req.params.page and/or limit not provided', () => {
		// create request
		const mockedReq = mockReq({});
		// create response
		const mockedRes = mockRes;
		// call middleware and catch error
		expect(() => {
			try {
				validateDate(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe(
					`Invalid query, include page and limit in url path`,
				);
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});

	it('should throw an error if req.params.page and/or limit are NaN', () => {
		// create request
		const mockedReq = mockReq({ page: 'page', limit: 'limit' });
		// create response
		const mockedRes = mockRes;
		// call middleware and catch error
		expect(() => {
			try {
				validateDate(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe(`Invalid limit or page param provided`);
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});
});
