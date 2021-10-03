import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dream, DreamDocument } from './schemas/dream.schema';
import { ObjectId } from 'mongodb';
import { CreateDreamDto } from './dto/create-dream.dto';
import { UpdateDreamDto } from './dto/update-dream.dto';

@Injectable()
export class DreamService {
  constructor(
    @InjectModel(Dream.name) private readonly dreamModel: Model<DreamDocument>,
  ) {}

  async getDreams({page, limit, startDate, endDate, title, type}) {
    let queryObj = {$and: []}
    if(startDate && !endDate) queryObj.$and.push({$gt: startDate})
    if(!startDate && endDate) queryObj.$and.push({$lt : endDate})
    if(startDate && endDate) queryObj.$and.push({$gt: startDate, $lt: endDate}) 
    if(type) queryObj.$and.push({type})
    if(title) queryObj.$and.push({title})
    return await this.dreamModel.find(queryObj).limit(limit).skip((page -1) * limit)
  }

  async getDream(_id: ObjectId) {
    const found = await this.dreamModel.findOne({ _id });
    if (!found) throw new ConflictException(`Dream not found, try again`);
    return found;
  }

  async createDream(createDreamDto: CreateDreamDto) {
    const created = await this.dreamModel.create(createDreamDto);
    if (!created) throw new ConflictException('Dream not created, try again');
    return created;
  }

  async updateDream(_id: ObjectId, updateDreamDto: UpdateDreamDto) {
    const updated = await this.dreamModel.findByIdAndUpdate(
      _id,
      { $set: updateDreamDto },
      { new: true },
    );
    if (!updated)
      throw new ConflictException('Dream not found and updated, try again');
    return updated;
  }

  async removeDream(_id) {
    const deleted = await this.dreamModel.findByIdAndRemove(_id);
    if (!deleted)
      throw new ConflictException('Dream not found and deleted, try again');
    return deleted;
  }

}
