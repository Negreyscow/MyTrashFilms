export interface Movie {
  _id?: string,
  Title: string,
  Genre: string,
  Year: string,
  Plot: string
  imdbRating: number,
  imdbID: string,
  Poster: string,
  Comment?: string,
  Watched?: boolean
}
