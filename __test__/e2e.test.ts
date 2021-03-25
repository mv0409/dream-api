import axios from 'axios';
import { env } from '../src/env';
import { DreamInterface } from '../src/helpers/interfaces/dream.interface';
import makeDream from './fixtures/create-dream';

describe('test api endpoint', () => {
	jest.useFakeTimers();
	beforeAll(() => {
		axios.defaults.baseURL = `${env.app.schema}://${env.app.host}:${env.app.port}`;
		axios.defaults.headers.common['Content-Type'] =
			'application/json';
		axios.defaults.withCredentials = true;
		axios.defaults.validateStatus = (status) => {
			return status < 500;
		};
	});

	test('dream controller', async () => {
		const dream: DreamInterface = makeDream();
		const req = await axios.post(`/api/dream/create`, dream);
		expect(req.status).toBe(201);
		expect(req.data.success).toBe(true);
	});
});
