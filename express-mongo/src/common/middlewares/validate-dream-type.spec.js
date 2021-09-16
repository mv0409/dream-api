const validateDreamType = require('./validate-dream-type');
const { possibleTypes } = require('../../dream/models/dream');

describe('🧪 Validate dream type middleware test', () => {
	// dynamic mock of req.query.type
	const mockReq = (type) => ({
		query: {
			type: type || undefined,
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

	it('should call next function if type not provided, and query all dreams', () => {
		// create request
		const mockedReq = mockReq();
		// create response
		const mockedRes = mockRes();
		// call middleware
		validateDreamType(mockedReq, mockedRes, mockedNext);
		// check if queryObj to exists in locals var
		expect(mockedRes.locals.queryObj).toBeDefined();
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', []);
	});

	it('should add type for req.query.type into queryObj', () => {
		// create request
		const mockedReq = mockReq('happy');
		// create reponse
		const mockedRes = mockRes();
		// call middleware
		validateDreamType(mockedReq, mockedRes, mockedNext);
		// check if queryObj to exists in locals var
		expect(mockedRes.locals.queryObj).toBeDefined();
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
			{ type: 'happy' },
		]);
	});

	it('should throw an error if req.query.type does not exists', () => {
		// create request
		const mockedReq = mockReq('supreme');
		// create reponse
		const mockedRes = mockRes();
		// call middleware and catch error
		expect(() => {
			try {
				validateDate(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe(
					`Dream type must be one of possible types / (${possibleTypes})`,
				);
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});
});
