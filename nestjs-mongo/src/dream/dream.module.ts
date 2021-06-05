import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DreamTypeController } from './dream-type.controller';
import { DreamController } from './dream.controller';
import { Dream } from './dream.model';
import { DreamRepository } from './dream.repository';
import { DreamService } from './dream.service';
import { AuditMiddleware } from '../middlewares/audit.middleware';

@Module({
	imports: [MongooseModule.forFeature([Dream])],
	controllers: [DreamController, DreamTypeController],
	providers: [DreamService, DreamRepository],
})
export class DreamModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuditMiddleware).forRoutes('dream');
	}
}
