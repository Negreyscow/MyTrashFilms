import { Component, OnInit } from '@angular/core';

import { Movie } from './movie-create/movie.model';
import { MovieService } from './../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[]

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    console.log('movies')
    this.movieService.getMovies().subscribe( movies => {
      this.movies = movies
      console.log(movies)
    })
  }

}
