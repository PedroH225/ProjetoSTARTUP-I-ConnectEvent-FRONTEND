import { Component, Input, OnInit } from '@angular/core';
import { TipoEventoService } from '../../../../services/tipo-evento.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  tipos: any[] = []; // Variável para armazenar os tipos

  constructor(private tipoEventoService: TipoEventoService) {}

  ngOnInit(): void {
    this.getTipoEvento(); // Chamar o método quando o componente for inicializado
  }

  getTipoEvento(): void {
    this.tipoEventoService.getTipoEvento().subscribe(
      (response) => {
        this.tipos = response; // Armazena os eventos recebidos
      },
      (error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
  }
}
