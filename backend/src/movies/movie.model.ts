import * as mongoose from 'mongoose'

export const MovieSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        required: true
    },
    imdbRating: {
        type: Number,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Plot: {
        type: String,
        required: true
    },
    Poster: {
        type: String,
        required: true
    },
    Comment: {
        type: String,
        default: ''
    },
    Watched: {
        type: Boolean,
        default: true
    },
})

export interface Movie extends mongoose.Document {
    id?: string,
    Title: string,
    Genre: string,
    Year: string,
    Plot: string,
    imdbRating: number,
    Poster: string,
    imdbID: string,
    Comment?: string,
    Watched?: boolean
}


