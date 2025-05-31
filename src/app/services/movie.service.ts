import { Injectable } from '@angular/core';
import { Movie, MovieListResponse } from '../models/movie.model';
import { environment } from '../core/constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchFilter } from '../models/search-filter.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiUrl = `${environment.apiUrl}`;
  private readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getMovies(filters: SearchFilter): Observable<MovieListResponse> {
    let params = new HttpParams().set('api_key', this.apiKey);

    if (filters.name) {
      params = params.set('query', filters.name);
    }
    if (filters.genres && filters.genres.length > 0) {
      let genres: number[] = [];
      filters.genres.map((v) => genres.push(v.id));
      params = params.set('with_genres', genres.join(','));
    }
    if (filters.originalLanguage) {
      params = params.set('with_original_language', filters.originalLanguage);
    }
    if (filters.year) {
      params = params.set('primary_release_year', filters.year.toString());
    }

    if (filters.voteAverage) {
      params = params.set(
        'primary_release_year',
        filters.voteAverage.toString()
      );
    }
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }

    const url = filters.name ? '/search/movie' : '/discover/movie';
    console.log(`${this.apiUrl}${url}`, { params });

    return this.http.get<any>(`${this.apiUrl}${url}`, { params });
  }
}
