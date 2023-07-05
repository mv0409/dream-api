import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { DreamService } from './dream.service';
import { ObjectId } from 'mongodb';
import { UpdateDreamDto } from './dto/update-dream.dto';
import { CreateDreamDto } from './dto/create-dream.dto';
import { ValidateDreamTypePipe } from '../../common/pipes/validate-dream-type.pipe';
import { ValidateDatePipe } from '../../common/pipes/validate-date.pipe';
import { DREAM_TYPE } from 'src/common/enums';

@Controller('dream')
export class DreamController {
  constructor(private readonly dreamService: DreamService) {}

  @Get()
  getDreams(
    @Query('startDate', ValidateDatePipe) startDate: Date,
    @Query('endDate', ValidateDatePipe) endDate: Date,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('type', ValidateDreamTypePipe) type: DREAM_TYPE,
    @Query('title') title: string
  ) {
    return this.dreamService.getDreams({ page, limit, type, startDate, endDate, title });
  }

  @Get('/types')
  getDreamTypes() {
    return Object.values(DREAM_TYPE);
  }

  @Get('/:id')
  getDream(@Param('id') _id: ObjectId) {
    return this.dreamService.getDream(_id);
  }

  @Post()
  createDream(@Body() createDreamDto: CreateDreamDto) {
    return this.dreamService.createDream(createDreamDto);
  }

  @Patch('/:id')
  updateDream(@Param('id') _id: ObjectId, @Body() updateDreamDto: UpdateDreamDto) {
    return this.dreamService.updateDream(_id, updateDreamDto);
  }

  @Delete('/:id')
  removeDream(@Param('id') _id: ObjectId) {
    return this.dreamService.removeDream(_id);
  }
}
