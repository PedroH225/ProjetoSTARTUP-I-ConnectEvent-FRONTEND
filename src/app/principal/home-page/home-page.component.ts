import { Component } from '@angular/core';
import { EventosService } from '../../../services/eventos.service'; // Importa o serviço

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isCollapsed = true; // NAO TIRAR ISSO DAQUI

  toggleFiltro(): void {
    this.isCollapsed = !this.isCollapsed; // Alterna entre colapsado e expandido
  }

  eventos: any[] = []; // Variável para armazenar os eventos

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.getEventos(); // Chama o método para buscar todos os eventos
  }

  getEventos(): void {
    this.eventosService.getEventos().subscribe(
      (response) => {
        this.eventos = response; // Armazena os eventos recebidos
      },
      (error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
  }

  atualizarEventos(eventosFiltrados: any[]): void {
    this.eventos = eventosFiltrados; // Atualiza os eventos na home
  }
}
