import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548,
  },
];

@Component({
  selector: 'app-eventos-anunciados',
  templateUrl: './eventos-anunciados.component.html',
  styleUrl: './eventos-anunciados.component.scss',
  // imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  // standalone: true,
})
export class EventosAnunciadosComponent {
  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries?: Country[];

  constructor() {
    this.refreshCountries();
  }

  refreshCountries() {
    this.countries = COUNTRIES.map((country, i) => ({
      id: i + 1,
      ...country,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
}
