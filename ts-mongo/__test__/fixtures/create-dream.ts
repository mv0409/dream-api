import faker from 'faker';
import { possibleTypes } from '../../src/db/entity/dream';
import { DreamInterface } from '../../src/helpers/interfaces/dream.interface';

export default function makeDream(): DreamInterface {
	const types = possibleTypes;
	const randomNumber = (min: number, max: number) => {
		return Math.floor(min + Math.random() * (max - min));
	};
	const i: number = randomNumber(0, types.length);
	return {
		title: `${faker.name.title()}`,
		description: `${faker.name.jobDescriptor()}`,
		date: `21/04/2020`,
		type: types[i],
	};
}
