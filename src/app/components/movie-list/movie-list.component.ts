import { Component, Input, SimpleChanges } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { CardComponent } from '../card/card.component';
import { RowListComponent } from '../row-list/row-list.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CardComponent, RowListComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];

  items: Movie[][] = [];
  constructor() {}
  ngOnInit() {
    this.items = this.groupIntoRows(this.movies);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies']) {
      this.items = this.groupIntoRows(this.movies);
    }
  }
  groupIntoRows<Movie>(items: Movie[], columns = 3): Movie[][] {
    const result: Movie[][] = [];
    for (let i = 0; i < items.length; i += columns) {
      result.push(items.slice(i, i + columns));
    }
    return result;
  }
}
