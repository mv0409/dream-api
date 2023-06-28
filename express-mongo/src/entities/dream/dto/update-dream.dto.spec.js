const { possibleTypes } = require('../models/dream');
const updateDream = require('./update-dream.dto');

describe('Create Dream Data Transfer Objec test', () => {
  const mockReq = (body) => ({
    body: {
      title: body.title || undefined,
      description: body.description || undefined,
      type: body.type || undefined,
      date: body.date || undefined
    }
  });

  const mockRes = () => ({
    get: () => {}
  });

  const mockedNext = jest.fn();

  const mockDreamDoc = ({ title, description, type, date }) => ({
    title: title || 'cool title',
    description: description || 'cool description',
    type: type || 'happy',
    date: date || new Date('2020-11-11')
  });

  beforeEach(() => {
    mockedNext.mockClear();
  });

  it('should validate req.body and call next function ', () => {
    const mockedDreamDoc = mockDreamDoc({});
    const mockedReq = mockReq(mockedDreamDoc);
    const mockedRes = mockRes();
    updateDream(mockedReq, mockedRes, mockedNext);
    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedReq.body.date).toEqual(mockedDreamDoc.date);
  });

  it('should throw an error if req.body props are not valid ', () => {
    const mockedDreamDoc = mockDreamDoc({});
    const { type, ...restOfDto } = mockedDreamDoc;
    const mockedReq = mockReq(restOfDto);
    const mockedRes = mockRes();
    expect(() => {
      try {
        createDreamDto(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe('Invalid dream data transfer object');
      }
    });
  });

  it('should throw an error if req.body.type is not valid ', () => {
    const mockedDreamDoc = mockDreamDoc({ type: 'supreme' });
    const mockedReq = mockReq(mockedDreamDoc);
    const mockedRes = mockRes();
    expect(() => {
      try {
        updateDream(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe(`Dream types must be ${possibleTypes}`);
      }
    });
  });

  it('should throw an error if req.body props have unnecessary props ', () => {
    const mockedDreamDoc = mockDreamDoc({});
    mockedDreamDoc.bug = 'my value';
    const mockedReq = mockReq(mockedDreamDoc);
    const mockedRes = mockRes();
    expect(() => {
      try {
        createDreamDto(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe(`Invalid dream data transfer object, unnecessary prop: bug`);
      }
    });
  });

  it('should throw an error if req.body.date is not valid ', () => {
    const mockedDreamDoc = mockDreamDoc({ date: 'supreme' });
    const mockedReq = mockReq(mockedDreamDoc);
    const mockedRes = mockRes();
    expect(() => {
      try {
        updateDream(mockedReq, mockedRes, mockedNext);
      } catch (error) {
        expect(error.message).toBe('Invalid date');
      }
    });
  });
});
