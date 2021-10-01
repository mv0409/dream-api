import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { DreamController } from "./dream.controller";
import { DreamService } from "./dream.service";
import { Dream, DreamSchema } from "./schemas/dream.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Dream.name ,schema: DreamSchema}])],
    controllers: [DreamController],
    providers: [DreamService],
    exports: [DreamService]
})

export class DreamModule{}