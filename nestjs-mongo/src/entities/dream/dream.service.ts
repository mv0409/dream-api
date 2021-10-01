import { Injectable } from "@nestjs/common";
import { Dream, DreamDocument } from "./schemas/dream.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

@Injectable()
export class DreamService {
    constructor(
        @InjectModel(Dream.name) private dreamModel: Model<DreamDocument>
    ) {}
}