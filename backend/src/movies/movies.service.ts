import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Movie } from './movie.model'

@Injectable()
export class MoviesService {

    constructor(
        @InjectModel('Movie') private readonly movieModel: Model<Movie>
    ){}
    
    async setMovie(movie: Movie){        
        const hasMovie = await this.movieModel.find({imdbID: movie.imdbID}).exec()
        
        if (hasMovie.length){
            throw new BadRequestException('Duplicated movie!')  
        }

        
        const newMovie = new this.movieModel(movie)

        const result = await newMovie.save()
        return { data: result }
    }

    async getMovies() {
        return await this.movieModel.find().exec() || []
    }

    async getMovie(id: string) {
        return this.findMovie(id)
    }
    

    async updateMovie(id: string, movie: Movie){
        const updatedMovie = await this.findMovie(id)

        updatedMovie.Comment = movie.Comment
        updatedMovie.Watched = movie.Watched

        const result = await updatedMovie.save()
        return { id: result._id }
    }

    async deleteMovie(id: string){
        try {
            const result = await this.movieModel.deleteOne({_id: id}).exec()

            if (result.n === 0){
                throw new NotFoundException('There is no movie :(') 
            }
            
            return { message: 'Movie deleted' }
        } catch (error) {
            throw new NotFoundException('There is no movie :(') 
        }
    }

    private async findMovie(id: string){        
        try {
            return await this.movieModel.findById(id)
        } catch (err) {
            throw new NotFoundException('Movie not found :(')
        }
    }

}
