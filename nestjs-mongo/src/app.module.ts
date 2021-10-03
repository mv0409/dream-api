import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DreamModule } from './entities/dream/dream.module';
import dotenv from 'dotenv'

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {		
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }),
    DreamModule
],
  providers: [],
})
export class AppModule {}
