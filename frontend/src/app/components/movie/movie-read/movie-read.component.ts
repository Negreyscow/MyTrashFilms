import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

import { MovieService } from './../../../services/movie.service';
import { Movie } from './../movie-create/movie.model';


@Component({
  selector: 'app-movie-read',
  templateUrl: './movie-read.component.html',
  styleUrls: ['./movie-read.component.css']
})
export class MovieReadComponent implements OnInit {
  // movies: Movie[]
  @Input() movies: Movie[]

  constructor(
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    // this.movieService.getMovies().subscribe( movies => {
    //   this.movies = movies
    //   console.log(movies)
    // })
  }

  editMovie(){
    this.router.navigate(['movie/edit'])
  }

}
