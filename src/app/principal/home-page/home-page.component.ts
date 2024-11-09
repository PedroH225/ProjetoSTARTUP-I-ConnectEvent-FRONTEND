import { Component } from '@angular/core';
import { EventosService } from '../../../services/eventos.service'; // Importa o serviço

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  eventos: any[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(): void {
    this.eventosService.getEventos().subscribe(
      (response) => {
        this.eventos = response;
      },
      (error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
  }

  atualizarEventos(eventosFiltrados: any[]): void {
    this.eventos = eventosFiltrados;
  }
}
