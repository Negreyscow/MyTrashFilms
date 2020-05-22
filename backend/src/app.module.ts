import { Module, HttpModule } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { MoviesModule } from './movies/movies.module';
import { ImdbService } from './services/imdbApi/imdbApi.service';


@Module({
  imports: [
    HttpModule, 
    MoviesModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:cvIVFWwBcrRgdIua@cluster0-ywhqa.mongodb.net/test?retryWrites=true&w=majority'
    )
  ],
  providers: [ImdbService],
})
export class AppModule {}
