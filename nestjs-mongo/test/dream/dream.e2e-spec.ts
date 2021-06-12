import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DreamType } from '../../src/dream/dream.model';
import { DreamModule } from '../../src/dream/dream.module';
import { DreamService } from '../../src/dream/dream.service';
import { MongooseModule } from '@nestjs/mongoose';

describe('DreamController (e2e)', () => {
	let app: INestApplication;
	let dream = {
		title: 'Test Dream',
		description: 'Test Dreams ',
		date: '5.2.2021',
		type: 'scary',
	};
	let dreamDoc = {
		id: '60889694a57f382481306f0f',
		title: 'Test Dream',
		description: 'Test Dreams ',
		date: '5.2.2021',
		type: 'scary',
		__v: 0,
	};
	let dreamService = {
		create: () => [dreamDoc],
		findOne: () => [dreamDoc],
		update: () => [dreamDoc],
		remove: () => [dreamDoc],
	};

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				DreamModule,
				MongooseModule.forRoot(
					`mongodb://localhost:27017/k7-tech-db-test`,
					{
						useFindAndModify: false,
					},
				),
			],
		})
			.overrideProvider(DreamService)
			.useValue(dreamService)
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('(GET) dream-type', () => {
		return request(app.getHttpServer())
			.get('/dream-type')
			.expect(200)
			.expect(DreamType);
	});

	it('(POST) dream', () => {
		return request(app.getHttpServer())
			.post('/dream')
			.send(dream)
			.expect(201)
			.expect(dreamService.create());
	});

	it('(PUT) dream', () => {
		return request(app.getHttpServer())
			.put(`/dream/${dreamDoc.id}`)
			.send(dream)
			.expect(200)
			.expect(dreamService.update());
	});

	it('(GET) dream', () => {
		return request(app.getHttpServer())
			.get(`/dream/${dreamDoc.id}`)
			.expect(200)
			.expect(dreamService.findOne());
	});

	it('(DELETE) dream', () => {
		return request(app.getHttpServer())
			.delete(`/dream/${dreamDoc.id}`)
			.expect(200)
			.expect(dreamService.remove());
	});

	afterAll(async () => {
		await app.close();
	});
});
