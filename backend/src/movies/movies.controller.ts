import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';

import { MoviesService } from './movies.service'
import { Movie } from './movie.model'

@Controller('movies')
export class MoviesController {
    
    constructor(
        private readonly service: MoviesService,
    ){}

    // @Post()
    // setMovie(
    //     @Body('input') input: string,
    //     @Body('description') description: string,
    //     @Body('category') category: string,
    //     @Body('watched') watched: boolean
    // ){
    //     return this.service.setMovie(input, description, category, watched)
    // }

    @Post()
    setMovie(@Body() movie: Movie){
        console.log("moviee", movie)
        return this.service.setMovie(movie)
    }

    @Get()
    async getMovies(){
        return await this.service.getMovies()
    }
    
    @Get(':id')
    getMovie(@Param('id') id: string){
        return this.service.getMovie(id)
    }


    @Patch(':id')
    async updateMovie(
        @Param('id') id: string,
        @Body() movie: Movie
    ){
        return await this.service.updateMovie(id, movie)
    }

    @Delete(':id')
    async deleteMovie(@Param('id') id: string){
        return await this.service.deleteMovie(id)
    }

}
