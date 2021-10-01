import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })],
  providers: [],
})
export class AppModule {}
