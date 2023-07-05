import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dream, DreamDocument } from './schemas/dream.schema';
import { ObjectId } from 'mongodb';
import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';

@Injectable()
export class DreamService {
  constructor(@InjectModel(Dream.name) private readonly dreamModel: Model<DreamDocument>) {}

  async getDreams({ page, limit, startDate, endDate, title, type }) {
    const queryObj = { $and: [] };
    if (startDate) {
      endDate
        ? queryObj.$and.push({ $gt: startDate, $lt: endDate })
        : queryObj.$and.push({ $gt: startDate });
    } else if (endDate) {
      queryObj.$and.push({ $lt: endDate });
    }

    if (type) queryObj.$and.push({ type });
    if (title) queryObj.$and.push({ title });
    return await this.dreamModel
      .find(queryObj)
      .limit(limit)
      .skip((page - 1) * limit);
  }

  async getDream(_id: ObjectId) {
    return this.getDreamByIdOrThrow(_id);
  }

  async createDream(createDreamDto: CreateDreamDto) {
    return this.dreamModel.create(createDreamDto);
  }

  async updateDream(_id: ObjectId, updateDreamDto: UpdateDreamDto) {
    await this.getDreamByIdOrThrow(_id);
    return this.dreamModel.findByIdAndUpdate(_id, { $set: updateDreamDto }, { new: true });
  }

  async removeDream(_id: ObjectId) {
    await this.getDreamByIdOrThrow(_id);
    return this.dreamModel.findByIdAndRemove(_id);
  }

  async getDreamByIdOrThrow(_id: ObjectId) {
    const found = await this.dreamModel.findOne({ _id });
    if (!found) throw new NotFoundException(`Dream not found, try again`);
    return found;
  }
}
