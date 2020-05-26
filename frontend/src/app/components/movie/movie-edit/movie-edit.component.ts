import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from './../../../services/movie.service';
import { Movie } from './../movie-create/movie.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movie: Movie
  comment: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.movieService.getMovieByID(id).subscribe(movie => {
      this.movie = movie
      console.log('edit', movie)
    })
  }

  deleteMovie(id: string): void {
    this.movieService.delete(id).subscribe(() => {
      this.movieService.delete(id)
      this.movieService.showMessage('Movie deleted')
      this.router.navigate(['/'])
    })
  }

  cancel(){
    this.router.navigate(['/'])
  }

  saveComment(){
    this.movieService.updateMovie(this.movie).subscribe(response => {
      this.movieService.showMessage('Movie updated')
      this.comment = false
      console.log(response)
    })
  }

}
