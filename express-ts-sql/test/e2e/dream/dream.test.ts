import request from 'supertest';
import { server, db } from '../../../src/index';
import { DREAM_TYPE, IMockDream } from '../../../src/entities/dream/types';
import { DataSource } from 'typeorm';

describe('🧪 Dream end to end test', () => {
  let dreamId: string;
  let dataSource: DataSource | undefined;

  const createDreamDto = ({ title, description, date, type }: IMockDream) => ({
    title: title || 'Title number 1',
    description: description || 'Description number 1',
    date: date || new Date('2017-12-12'),
    type: type || 'happy'
  });

  beforeAll(async () => {
    dataSource = await db;
  });

  afterAll(async () => {
    server.close();
    dataSource?.destroy();
  });

  it('should get dream types', async () => {
    const res = await request(server).get('/dream/type');
    expect(res.body).toEqual(Object.values(DREAM_TYPE));
  });

  it('should create dream', async () => {
    const dream = createDreamDto({});
    const res = await request(server).post('/dream').send(dream);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual(dream.title);
    expect(res.body.description).toEqual(dream.description);
    expect(res.body.type).toEqual(dream.type);
    expect(res.body.date).toEqual(dream.date.toISOString());
    dreamId = res.body.id;
  });

  it('should find dream', async () => {
    const dream = createDreamDto({});
    const res = await request(server).get(`/dream/${dreamId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(dreamId);
    expect(res.body.title).toEqual(dream.title);
    expect(res.body.description).toEqual(dream.description);
    expect(res.body.type).toEqual(dream.type);
    expect(res.body.date).toEqual(dream.date.toISOString());
  });

  it('should update dream', async () => {
    const dream = createDreamDto({ title: 'Title number 2' });
    const res = await request(server).patch(`/dream/${dreamId}`).send(dream);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(dreamId);
    expect(res.body.title).toEqual(dream.title);
    expect(res.body.description).toEqual(dream.description);
    expect(res.body.type).toEqual(dream.type);
    expect(res.body.date).toEqual(dream.date.toISOString());
  });

  it('should delete dream by id', async () => {
    const res = await request(server).delete(`/dream/${dreamId}`);
    expect(res.statusCode).toEqual(204);
  });
});
