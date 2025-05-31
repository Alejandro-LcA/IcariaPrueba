import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Genre } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SearchFilter } from '../../models/search-filter.model';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { GenreService } from '../../services/genre.service';
@Component({
  selector: 'app-movie-search',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    SliderModule,
  ],
  standalone: true,
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent implements OnInit {
  searchTitle = '';
  @Output() filtersChanged = new EventEmitter<SearchFilter>();

  languages = [
    { label: 'Todos', value: '' },
    { label: 'Inglés', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Francés', value: 'fr' },
    { label: 'Japonés', value: 'ja' },
  ];
  genresFull: Genre[] = [];
  genres: { label: string; id: number }[] = [];

  form = new FormGroup({
    name: new FormControl<string | undefined>(''),
    genres: new FormControl<Genre[] | undefined>([]),
    originalLanguage: new FormControl<string | undefined>(''),
    year: new FormControl<number | undefined>(undefined),
    voteAverage: new FormControl<number>(0),
  });

  constructor(private fb: FormBuilder, private genreService: GenreService) {}

  ngOnInit() {
    this.genreService
      .getGenres()
      .subscribe((response: any) =>
        response.genres.map((gen: { name: any; id: any }) =>
          this.genres.push({ label: gen.name, id: gen.id })
        )
      );
  }

  onSubmit() {
    this.filtersChanged.emit(this.form.value as SearchFilter);
  }
}

//https://api.themoviedb.org/3/search/movie?api_key=70f6b4f0fbcded8bd905e6a5782f18a4&query=inception
//https://image.tmdb.org/t/p/original/IMAGEN
