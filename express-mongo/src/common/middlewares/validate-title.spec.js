const validateTitle = require('./validate-title');

describe('🧪 Validate dream title middleware test', () => {
	// dynamic mock of req.query.type
	const mockReq = (title) => ({
		query: {
			title: title || undefined,
		},
	});
	// mock response with express response
	const mockRes = () => ({
		get: () => {},
		locals: { queryObj: { $and: [] } },
	});

	// mock nextFunction
	const mockedNext = jest.fn();

	beforeEach(() => {
		// clear mock calls
		mockedNext.mockClear();
	});

	it('should call next function if title not provided, and query all dreams', () => {
		// create request
		const mockedReq = mockReq();
		// create response
		const mockedRes = mockRes();
		// call middleware
		validateTitle(mockedReq, mockedRes, mockedNext);
		// check if queryObj to exists in locals var
		expect(mockedRes.locals.queryObj).toBeDefined();
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', []);
	});

	it('should add type for req.query.type into queryObj', () => {
		// create request
		const mockedReq = mockReq('Cool title');
		// create response
		const mockedRes = mockRes();
		// call middleware
		validateTitle(mockedReq, mockedRes, mockedNext);
		// check if queryObj to exists in locals var
		expect(mockedRes.locals.queryObj).toBeDefined();
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
			{ title: mockedRes.locals.queryObj.$and[0].title },
		]);
	});
});
