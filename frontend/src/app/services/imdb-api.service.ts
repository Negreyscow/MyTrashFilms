import { environment } from './../../environments/environment';
import { Movie } from './../components/movie/movie-create/movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
// import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ImdbApiService {

  apiKey: string = ''

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.apiKey = environment.imdbApiKey
  }

  async getMovieByImdbId(imdbId: string){
    return this.http.get<Movie>(`http://www.omdbapi.com/?apikey=${this.apiKey}&i=${imdbId}`).toPromise()
  }

  async getMovieByTitle(title: string){
    return this.http.get<Movie>(`http://www.omdbapi.com/?apikey=${this.apiKey}&t=${title}`).toPromise()
  }

}
