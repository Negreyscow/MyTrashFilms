import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';

import { MoviesService } from './movies.service'
import { IMovie } from './movie.model'

@Controller('movies')
export class MoviesController {
    
    constructor(private readonly service: MoviesService){}

    @Post()
    setMovie(
        @Body('input') input: string,
        @Body('description') description: string,
        @Body('category') category: string,
        @Body('watched') watched: boolean
    ){
        return this.service.setMovie(input, description, category, watched)
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
        @Body('description') description: string,
        @Body('category') category: string,
        @Body('watched') watched: boolean
    ){
        return await this.service.updateMovie(id, description, category, watched)
    }

    @Delete(':id')
    async deleteMovie(@Param('id') id: string){
        return await this.service.deleteMovie(id)
    }

}
