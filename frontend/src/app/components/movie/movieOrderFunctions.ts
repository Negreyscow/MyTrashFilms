import { Movie } from './movie-create/movie.model';

export function orderByName(arr: Movie[], order: string){
  arr.sort((a, b) => {
    const x = a.Title.toLowerCase();
    const y = b.Title.toLowerCase();

    return order === 'asc'
      ? (x < y ? -1 : x > y ? 1 : 0)
      : (x > y ? -1 : x < y ? 1 : 0)
    });
}

export function orderByRating(arr: Movie[], order: string){
  arr.sort((a, b) => {
    return order === 'asc'
      ? a.imdbRating - b.imdbRating
      : b.imdbRating - a.imdbRating
  })
}

export function orderByYear(arr: Movie[], order: string){
  arr.sort((a, b) => {
    const x = parseInt(a.Year)
    const y = parseInt(b.Year)

    return order === 'asc'
      ? x - y
      : y - x
  })
}


