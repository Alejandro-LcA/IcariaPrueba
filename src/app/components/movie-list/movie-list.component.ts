import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
}
