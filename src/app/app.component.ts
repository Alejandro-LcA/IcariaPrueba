import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movie.service';
import { SearchFilter } from './models/search-filter.model';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MovieSearchComponent,
    MovieListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IcariaPrueba';

  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.movieService.getMovies({}).subscribe((response) => {
      this.movies = response.results;
    });
  }

  onFiltersChanged(filters: SearchFilter) {
    this.movieService.getMovies(filters).subscribe((response) => {
      if (filters.voteAverage) {
        this.movies = response.results.filter(
          (movie) => movie.vote_average > filters.voteAverage!
        );
      } else this.movies = response.results;
    });
  }
}
