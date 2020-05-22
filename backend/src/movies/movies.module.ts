import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { MoviesService } from './movies.service';
import { ImdbService } from '../services/imdbApi/imdbApi.service'
import { MoviesController } from './movies.controller';
import { MovieSchema } from './movie.model'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
    { name: 'Movie', schema: MovieSchema }]
  )],
  providers: [MoviesService, ImdbService],
  controllers: [MoviesController]
})
export class MoviesModule {}
