import { Genre } from './movie.model';

export interface SearchFilter {
  name?: string;
  genres?: Genre[];
  originalLanguage?: string;
  year?: number;
  voteAverage?: number;
  page?: number;
}
