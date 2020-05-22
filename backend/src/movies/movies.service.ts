import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ImdbService } from '../services/imdbApi/imdbApi.service'
import { IMovie } from './movie.model'

@Injectable()
export class MoviesService {

    constructor(
        @InjectModel('Movie') private readonly movieModel: Model<IMovie>,
        private readonly imdbService: ImdbService
    ){}

    async setMovie(
        input: string, 
        description: string, 
        category: string, 
        watched: boolean
    ){
        
        const data = await this.getDataFromAPI(input)
        
        const hasMovie = await this.movieModel.find({imdbID: data.imdbID}).exec()

        if (hasMovie){
            throw new NotFoundException('Duplicated movie!')  
        }
        
        const movie = new this.movieModel({
            title: data.Title,
            poster: data.Poster,
            imdbID: data.imdbID,
            description,
            watched,
            category
        })

        const result = await movie.save()
        return { id: result._id, data: result }
    }

    async getMovies() {
        const movies = await this.movieModel.find().exec() || []
        
        return movies.map(movie => ({
            id: movie._id,
            title: movie.title,
            description: movie.description,
            category: movie.category,
            watched: movie.watched
        }))
    }

    async getMovie(id: string) {
        const movie =  await this.findMovie(id)
        return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            category: movie.category,
            watched: movie.watched
        }
    }
    

    async updateMovie(
        id: string, 
        description: string, 
        category: string, 
        watched: boolean
    ){
        const movie = await this.findMovie(id)

        if (description)
            movie.description = description

        if (category)
            movie.category = category
        
        if (watched)
            movie.watched = watched

        const result = await movie.save()
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
        let movie
        
        try {
            movie = await this.movieModel.findById(id)
        } catch (err) {
            throw new NotFoundException('There is no movie :(')
        }

        if (!movie){
            throw new NotFoundException('There is no movie :(')
        }

        return movie
    }

}
