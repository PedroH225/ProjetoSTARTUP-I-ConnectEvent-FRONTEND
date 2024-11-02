import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-de-amigos',
  templateUrl: './lista-de-amigos.component.html',
  styleUrl: './lista-de-amigos.component.scss',
})
export class ListaDeAmigosComponent {
  amigos: any[] = [];
  paginatedAmigos: any[] = [];
  selectedFiltro: string = '';

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  refreshPaginatedAmigos(): void {
    this.paginatedAmigos = this.amigos.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }
  refreshEventos(): void {
    this.refreshPaginatedAmigos();
  }
}
