const { possibleTypes } = require('../models/dream');
const updateDream = require('./update-dream.dto')

describe('Create Dream Data Transfer Objec test', () => {
	// dynamic mock req.body obj
	let mockReq = (body) => ({
		body: {
			title: body.title || undefined,
			description: body.description || undefined,
			type: body.type || undefined,
			date: body.date || undefined,
		},
	});
	// dynamic mock res object
	let mockRes = () => ({
		get: () => {},
	});

	// mock nextFunction
	let mockedNext = jest.fn();

	// dynamic mock dream document
	let mockDreamDoc = ({ title, description, type, date }) => ({
		title: title || 'cool title',
		description: description || 'cool description',
		type: type || 'happy',
		date: date || new Date('2020-11-11'),
	});

	beforeEach(() => {
		// clear mock calls
		mockedNext.mockClear();
	});

	it('should validate req.body and call next function ', () => {
		// generate random dto
		const mockedDreamDoc = mockDreamDoc({});
		// pass dto to request
		let mockedReq = mockReq(mockedDreamDoc);
		// create resposne
		let mockedRes = mockRes();
		// call dto middleware
		updateDream(mockedReq, mockedRes, mockedNext);
		// call next function in middleware
		expect(mockedNext.mock.calls.length).toBe(1);
		// validate deep equal for date object
		expect(mockedReq.body.date).toEqual(mockedDreamDoc.date);
	});

	it('should throw an error if req.body props are not valid ', () => {
		// generate random dto
		const mockedDreamDoc = mockDreamDoc({});
		// remove one prop form dto
		const { type, ...restOfDto } = mockedDreamDoc;
		// pass dto to request
		let mockedReq = mockReq(restOfDto);
		// create response
		let mockedRes = mockRes();
		// call dto middleware
		expect(() => {
			try {
				createDreamDto(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe('Invalid dream data transfer object');
			}
		});
	});

	it('should throw an error if req.body.type is not valid ', () => {
		// generate random dto
		const mockedDreamDoc = mockDreamDoc({ type: 'supreme' });
		// pass dto to request
		let mockedReq = mockReq(mockedDreamDoc);
		// create response
		let mockedRes = mockRes();
		// call dto middleware
		expect(() => {
			try {
				updateDream(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe(`Dream types must be ${possibleTypes}`);
			}
		});
	});

    it('should throw an error if req.body props have unnecessary props ', () => {
		// generate random dto
		let mockedDreamDoc = mockDreamDoc({});
		// add one random prop to dto
		mockedDreamDoc.bug = "my value"
		// pass dto to request
		let mockedReq = mockReq(mockedDreamDoc);
		// create response
		let mockedRes = mockRes();
		// call dto middleware
		expect(() => {
			try {
				createDreamDto(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe(`Invalid dream data transfer object, unnecessary prop: bug`);
			}
		});
	});

	it('should throw an error if req.body.date is not valid ', () => {
		// generate random dto
		const mockedDreamDoc = mockDreamDoc({ date: 'supreme' });
		// pass dto to request
		let mockedReq = mockReq(mockedDreamDoc);
		// create response
		let mockedRes = mockRes();
		// call dto middleware
		expect(() => {
			try {
				updateDream(mockedReq, mockedRes, mockedNext);
			} catch (error) {
				expect(error.message).toBe('Invalid date');
			}
		});
	});
});
