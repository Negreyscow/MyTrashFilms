import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ImdbService } from '../services/imdbApi/imdbApi.service'
import { Movie } from './movie.model'

@Injectable()
export class MoviesService {

    constructor(
        @InjectModel('Movie') private readonly movieModel: Model<Movie>,
        private readonly imdbService: ImdbService
    ){}
    
    async setMovie(movie: Movie){        
        const hasMovie = await this.movieModel.find({imdbID: movie.imdbID}).exec()
        
        if (hasMovie.length){
            throw new NotFoundException('Duplicated movie!')  
        }

        
        const newMovie = new this.movieModel(movie)

        const result = await newMovie.save()
        return { data: result }
    }

    // async setMovie(
    //     input: string, 
    //     description: string, 
    //     category: string, 
    //     watched: boolean
    // ){
        
    //     const data = await this.getDataFromAPI(input)
        
    //     const hasMovie = await this.movieModel.find({imdbID: data.imdbID}).exec()
    //     console.log(hasMovie)
    //     if (hasMovie.length){
    //         throw new NotFoundException('Duplicated movie!')  
    //     }
        
    //     const movie = new this.movieModel({
    //         title: data.Title,
    //         poster: data.Poster,
    //         imdbID: data.imdbID,
    //         description,
    //         watched,
    //         category
    //     })

    //     const result = await movie.save()
    //     return { id: result._id, data: result }
    // }

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

    private async getDataFromAPI(input: string){
        const data = /tt\d{7}/.test(input) 
            ? await this.imdbService.getMovieByImdbId(input)
            : await this.imdbService.getMovieByTitle(input)
        
        const { Title, imdbID, Poster, imdbRating } = data

        if (parseFloat(imdbRating) > 5.5) {
            throw new NotFoundException('This is a good movie')
        }
        
        if (!imdbID){
            throw new NotFoundException('Movie not found')
        }

        return {
            Title,
            imdbID,
            Poster,
            imdbRating
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
