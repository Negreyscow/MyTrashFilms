import { Module, HttpModule } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { MoviesModule } from './movies/movies.module';


@Module({
  imports: [
    HttpModule, 
    MoviesModule,
    MongooseModule.forRoot(process.env.MONGO_URI)
  ],
  providers: [],
})
export class AppModule {}
