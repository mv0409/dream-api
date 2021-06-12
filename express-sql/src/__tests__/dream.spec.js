jest.useFakeTimers();
const Dream = require('../dream/schema/dream-schema');
const { checkDream } = require('../dream/controllers/get-dream');
const { checkDreamCreated } = require('../dream/controllers/create-dream');
const { checkDreamRemoved } = require('../dream/controllers/delete-dream');
const { checkDreamUpdate } = require('../dream/controllers/update-dream');

describe('Dream Test', () => {
	const dream = jest.fn();

	const mockDream = {
		dream: 'dream',
	};

	beforeAll(() => {
		Dream.findById = jest.fn().mockReturnValue({
			dream,
		});
	});

	it('should throw an error', () => {
		expect(() => checkDream(undefined)).toThrow('Dream not found');
	});

	it('should return a dream', () => {
		expect(checkDream(mockDream)).toEqual(mockDream);
	});

	it('should throw an error', () => {
		expect(() => checkDreamCreated(undefined)).toThrow(
			'Dream creation failed',
		);
	});

	it('should return a dream', () => {
		expect(checkDreamCreated(mockDream)).toEqual(mockDream);
	});

	it('should throw an error', () => {
		expect(() => checkDreamRemoved(undefined)).toThrow(
			'Failed to remove dream',
		);
	});

	it('should return a dream', () => {
		expect(checkDreamRemoved(mockDream)).toEqual(mockDream);
	});

	it('should throw an error', () => {
		expect(() => checkDreamUpdate(undefined)).toThrow(
			'Dream update fail',
		);
	});

	it('should return a dream', () => {
		expect(checkDreamUpdate(mockDream)).toEqual(mockDream);
	});

	// jest.fn({
	//     findById : jest.fn().mockReturnValue({
	//         smart:'smart'
	//     })
	// })

	// it('should throw an error', () => {
	//     dream.mockResolvedValueOnce(undefined)
	//     const found = await findDreamById('60bcb26c18b8f51ce92ce7e0')
	//     expect(found).
	// expect(async() => await findDreamById('60bcb26c18b8f51ce92ce7e0')).rejects.toThrow(
	//     'Dream not found'
	// )
	// })

	// it('should return dream document', async () => {
	//     const documentId = '60bcb26c18b8f51ce92ce7e0'
	//     const document = await findDreamById(documentId)
	//     // console.log(document)
	//     // expect(mockDreamModel.findById).toHaveBeenCalled()
	//     expect(document).toBeDefined()
	// })
});
