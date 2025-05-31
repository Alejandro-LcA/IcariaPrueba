import { Injectable } from '@angular/core';
import { environment } from '../core/constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly apiUrl = environment.apiUrl;
  private readonly apiKey = environment.apiKey;
  constructor(private http: HttpClient) {}

  getGenres() {
    let params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<any>(`${this.apiUrl}${'/genre/movie/list'}`, {
      params,
    });
  }
}
