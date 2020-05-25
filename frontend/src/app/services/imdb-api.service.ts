import { Movie } from './../components/movie/movie-create/movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ImdbApiService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  showMessage(msg :string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-erro'] : ['msg-success']
    })
  }

  async getMovieByImdbId(imdbId: string){
    return this.http.get<Movie>(`http://www.omdbapi.com/?apikey=d8f9f45&i=${imdbId}`).toPromise()
  }

  async getMovieByTitle(title: string){
    return this.http.get<Movie>(`http://www.omdbapi.com/?apikey=d8f9f45&t=${title}`).toPromise()
  }

}
