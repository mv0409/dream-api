'use strict';

const DreamServce = require('./dream.service');
const { Types } = require('mongoose');
const { Dream } = require('./models/dream');

describe('🧪 Dream service test', () => {
  const createDreamDto = {
    title: 'best title 1',
    description: 'best description',
    type: 'happy',
    date: '2021-11-11'
  };

  const updateDreamDto = {
    id: Types.ObjectId(),
    title: 'best title 2',
    description: 'best description',
    type: 'happy',
    date: '2021-11-11'
  };

  const mockDreamDoc = (mock) => ({
    id: Types.ObjectId(),
    title: mock?.title || 'Title number 1',
    description: mock?.description || 'Description number 1',
    date: mock?.date || new Date('2017-12-12T00:00:00.000+00:00'),
    type: mock?.type || 'happy'
  });

  it('should define dream service', () => {
    expect(DreamServce).toBeDefined();
  });

  it('should find a dream document by id', async () => {
    const dream = mockDreamDoc();
    jest.spyOn(Dream, 'findOne').mockReturnValueOnce(dream);
    const result = await DreamServce.findOne(dream.id);
    expect(result).toBeDefined();
    expect(result.id).toEqual(dream.id);
  });

  it('should throw an error document for unknown id', async () => {
    const dream = mockDreamDoc();
    jest.spyOn(Dream, 'findOne').mockReturnValueOnce(undefined);
    expect(async () => {
      try {
        await DreamServce.findOne(dream.id);
      } catch (error) {
        expect(error.message).toBe(`Dream with id: ${dream.id} not found`);
      }
    });
  });

  it('should create a dream and return document', async () => {
    jest.spyOn(Dream, 'create').mockReturnValueOnce(createDreamDto);
    const result = await DreamServce.create(createDreamDto);
    expect(result.title).toEqual(createDreamDto.title);
  });

  it('should throw an error if document is not created', async () => {
    jest.spyOn(Dream, 'create').mockReturnValueOnce(undefined);
    expect(async () => {
      try {
        await DreamServce.create(createDreamDto);
      } catch (error) {
        expect(error.message).toBe(`Dream not created`);
      }
    });
  });

  it('should update a dream and return new document', async () => {
    jest.spyOn(Dream, 'findOneAndUpdate').mockReturnValueOnce(updateDreamDto);
    const result = await DreamServce.update(updateDreamDto.id, updateDreamDto);
    expect(result.title).toEqual(updateDreamDto.title);
  });

  it('should throw an error if document is not updated', async () => {
    jest.spyOn(Dream, 'findOneAndUpdate').mockReturnValueOnce(undefined);
    expect(async () => {
      try {
        await DreamServce.update(updateDreamDto.id);
      } catch (error) {
        expect(error.message).toBe(`Dream not created`);
      }
    });
  });

  it('should delete a dream and return deleted document', async () => {
    jest.spyOn(Dream, 'findByIdAndRemove').mockReturnValueOnce(createDreamDto);
    const result = await DreamServce.delete(createDreamDto.id);
    expect(result.title).toEqual(createDreamDto.title);
  });

  it('should throw an error if document is not deleted', async () => {
    jest.spyOn(Dream, 'findOneAndUpdate').mockReturnValueOnce(updateDreamDto);
    expect(async () => {
      try {
        await DreamServce.delete(dreamDto.id);
      } catch (error) {
        expect(error.message).toBe(`Dream with id: ${id} not found and deleted`);
      }
    });
  });
});
