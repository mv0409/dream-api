const validateDate = require('./validate-date');

describe('🧪 Validate date middleware test', () => {
	// dynamic mock of req.query (startDate and endDate)
	let mockReq = ({ startDate, endDate }) => ({
		query: {
			startDate: startDate || undefined,
			endDate: endDate || undefined,
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

	it('should push all time date req.query into queryObj and pass it to next middleware', () => {
		// create response
		const mockedRes = mockRes();
		// create request
		const mockedReq = mockReq({});
		// call middleware
		validateDate(mockedReq, mockedRes, mockedNext);
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// queryObj added to locals
		expect(mockedRes.locals.queryObj).toBeDefined();
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
			{ date: { $lt: mockedRes.locals.queryObj.$and[0].date.$lt } },
		]);
	});

	it('should push startDate req.query into queryObj and pass it to next middleware', () => {
		// create response
		const mockedRes = mockRes();
		// create request
		const mockedReq = mockReq({ startDate: '2021-11-28' });
		// call middlware
		validateDate(mockedReq, mockedRes, mockedNext);
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// queryObj added to locals
		expect(mockedRes.locals.queryObj).toBeDefined();
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
			{ date: { $gt: mockedRes.locals.queryObj.$and[0].date.$gt } },
		]);
	});

	it('should push endDate req.query into queryObj and pass it to next middleware', () => {
		// create response
		const mockedRes = mockRes();
		// create request
		const mockedReq = mockReq({ endDate: '2021-11-28' });
		// call middleware
		validateDate(mockedReq, mockedRes, mockedNext);
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// queryObj added to locals
		expect(mockedRes.locals.queryObj).toBeDefined();
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
			{ date: { $lt: mockedRes.locals.queryObj.$and[0].date.$lt } },
		]);
	});

	it('should push startDate and endDate req.query into queryObj and pass it to next middleware', () => {
		// create response
		const mockedRes = mockRes();
		// create request
		const mockedReq = mockReq({
			startDate: '2020-11-28',
			endDate: '2021-11-28',
		});
		// call middleware
		validateDate(mockedReq, mockedRes, mockedNext);
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// queryObj added to locals
		expect(mockedRes.locals.queryObj).toBeDefined();
		// check response queryObj and its value
		expect(mockedRes.locals.queryObj).toHaveProperty('$and', [
			{
				date: {
					$gt: mockedRes.locals.queryObj.$and[0].date.$gt,
					$lt: mockedRes.locals.queryObj.$and[0].date.$lt,
				},
			},
		]);
	});

	it('should throw and error if req.query.startDate is invalid date or format', () => {
		// create response
		const mockedRes = mockRes();
		// create request
		const mockedReq = mockReq({ startDate: '2021-30-30' });
		// call middleware
		expect(() => {
			try {
				validateDate(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe('Invalid date');
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});

	it('should throw and error if req.query.endDate is invalid date or format', () => {
		// create response
		const mockedRes = mockRes();
		// create request
		const mockedReq = mockReq({ startDate: 'notdate' });
		// call middleware
		expect(() => {
			try {
				validateDate(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe('Invalid date');
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});

	it('should throw and error if req.query.endDate and req.query.startDate are invalid dates or formats', () => {
		// create response
		const mockedRes = mockRes();
		// create request
		const mockedReq = mockReq({ startDate: 'notdate', endDate: '2012-11-11' });
		// call middleware and catch error
		expect(() => {
			try {
				validateDate(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe('Invalid date');
			}
		});
		// dont call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(0);
	});
});
