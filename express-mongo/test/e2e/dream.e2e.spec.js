const request = require('supertest');
const { server, db } = require('../../src/index');
const { possibleTypes } = require('../../src/entities/dream/models/dream');

describe('🧪 Dream end to end test', () => {
  let dreamId;

  const createDreamDto = ({ title, description, date, type }) => ({
    title: title || 'Title number 1',
    description: description || 'Description number 1',
    date: date || '2017-12-12',
    type: type || 'happy'
  });

  afterAll(async () => {
    server.close();
    const database = await db;
    database.connection.close();
  });

  it('should get dream types', async () => {
    const res = await request(server).get('/dream/types');
    expect(res.body).toEqual(possibleTypes);
  });

  it('should create dream', async () => {
    const dream = createDreamDto({});
    const res = await request(server).post('/dream').send(dream);
    expect(res.body.title).toEqual(dream.title);
    expect(res.body.description).toEqual(dream.description);
    expect(res.body.type).toEqual(dream.type);
    dreamId = res.body._id;
  });

  it('should find dream', async () => {
    const res = await request(server).get(`/dream/${dreamId}`);
    expect(res.body._id).toEqual(dreamId);
  });

  it('should update dream', async () => {
    const dream = createDreamDto({ title: 'Title number 2' });
    const res = await request(server).patch(`/dream/${dreamId}`).send(dream);
    expect(res.body.title).toEqual(dream.title);
    expect(res.body.description).toEqual(dream.description);
    expect(res.body.type).toEqual(dream.type);
  });

  it('should delete dream by id', async () => {
    const dream = createDreamDto({ title: 'Title number 2' });
    const res = await request(server).delete(`/dream/${dreamId}`);
    expect(res.body.title).toEqual(dream.title);
    expect(res.body.description).toEqual(dream.description);
    expect(res.body.type).toEqual(dream.type);
  });
});
