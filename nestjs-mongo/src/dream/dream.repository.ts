import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPagination } from './dream.service';
import { Dream, DreamDocument } from './schema/dream-schema';

interface IQuery {
	title?: string;
	type?: string;
	date?: {
		$gt: Date;
		$lt: Date;
	};
}

@Injectable()
export class DreamRepository {
	constructor(
		@InjectModel(Dream.name)
		private dreamModel: Model<DreamDocument>,
	) {}

	async find(
		startDate: string,
		endDate: string,
		type: string,
		title: string,
		pagination?: IPagination,
	): Promise<{ rows: DreamDocument[]; count: number }> {
		const query: IQuery = {};
		if (title) query.title = title;
		if (type) query.type = type;
		if (startDate && endDate) {
			query.date = {
				$gt: new Date(startDate),
				$lt: new Date(endDate),
			};
		}
		let rows: DreamDocument[];
		if (pagination) {
			rows = await this.dreamModel
				.find(query)
				.limit(pagination.limit)
				.skip(pagination.page);
		} else {
			rows = await this.dreamModel.find(query);
		}
		const count = await this.dreamModel.find(query).countDocuments();
		return { count, rows };
	}

	async create(dream: Dream): Promise<DreamDocument> {
		const date = new Date(dream.date);
		date.setTime(
			date.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
		);
		dream.date = date;
		const dreamObj = new this.dreamModel(dream);
		const save = await dreamObj.save();
		return save;
	}

	async update(id: string, dream: Dream): Promise<DreamDocument> {
		const updated = await this.dreamModel.findOneAndUpdate(
			{ _id: id },
			{ $set: dream },
			{ new: true },
		);
		return updated;
	}

	async remove(id: string): Promise<DreamDocument> {
		const removed = await this.dreamModel.findByIdAndRemove(id);
		return removed;
	}

	async findOne(id: string): Promise<DreamDocument> {
		const find = await this.dreamModel.findById(id);
		return find;
	}
}
