import * as mongoose from 'mongoose'

export const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    watched: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: false
    }
})

export interface IMovie extends mongoose.Document {
    title: string
    imdbID: string
    poster: string
    category: string
    watched: boolean
    description: string
}



