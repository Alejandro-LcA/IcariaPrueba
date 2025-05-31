import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-row-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './row-list.component.html',
  styleUrl: './row-list.component.scss',
})
export class RowListComponent {
  @Input() row: Movie[] = [];
}
