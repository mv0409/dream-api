import { Controller } from "@nestjs/common";
import { DreamService } from "./dream.service";

@Controller('dream')
export class DreamController {
    constructor(
        private readonly dreamService: DreamService
    ) {}
}