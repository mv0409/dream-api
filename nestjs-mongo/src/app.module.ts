import { Module } from '@nestjs/common';
import { DreamModule } from './dream/dream.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		DreamModule,
		MongooseModule.forRoot(`mongodb://localhost:27017/k7-tech-db-test`, {
			useFindAndModify: false,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
