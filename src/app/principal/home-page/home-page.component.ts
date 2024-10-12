import { Component } from '@angular/core';
import { EventosService } from '../../../services/teste.service'; // Importa o serviço

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isCollapsed = false; // NAO TIRAR ISSO DAQUI

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
}
