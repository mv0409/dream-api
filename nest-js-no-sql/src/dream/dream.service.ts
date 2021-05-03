import { Injectable } from '@nestjs/common';
import { Dream, DreamDoc, DreamType } from './dream.model';
import { DreamRepository } from './dream.repository';

export interface IPagination {
	limit: number;
	page: number;
}

@Injectable()
export class DreamService {
	constructor(private readonly dreamRepository: DreamRepository) {}

	async find(
		startDate?: string,
		endDate?: string,
		page?: string,
		limit?: string,
		type?: string,
		title?: string,
	): Promise<{ rows: DreamDoc[]; count: number }> {
		let pagination: IPagination | undefined;

		if (type) {
			if (!DreamType.includes(type)) {
				throw new Error('Dream type must have following' + type);
			}
		}
		if (startDate && endDate) {
			const _startDate = new Date(startDate);
			const _endDate = new Date(endDate);
			if (
				_startDate.toString() === 'Invalid Date' ||
				_endDate.toString() === 'Invalid Date'
			) {
				throw new Error('Invalid date');
			}
			if (_startDate > _endDate) {
				throw new Error('Dream start date must happen before end date');
			}
		}

		if (limit && page) {
			const limitInt = parseInt(limit);
			const pageInt = parseInt(page);
			if (isNaN(limitInt) || isNaN(pageInt)) {
				throw new Error('Limit and Page must me intiger values');
			} else {
				const offset = (pageInt - 1) * limitInt;
				pagination = {
					limit: limitInt,
					page: offset,
				};
			}
		}
		return await this.dreamRepository.find(
			startDate,
			endDate,
			type,
			title,
			pagination,
		);
	}

	async create(dream: Dream): Promise<DreamDoc> {
		return await this.dreamRepository.create(dream);
	}

	async update(id: string, dream: Dream): Promise<DreamDoc> {
		return await this.dreamRepository.update(id, dream);
	}
	async remove(id: string): Promise<DreamDoc> {
		return await this.dreamRepository.remove(id);
	}

	async findOne(id: string): Promise<DreamDoc> {
		return await this.dreamRepository.findOne(id);
	}
}
