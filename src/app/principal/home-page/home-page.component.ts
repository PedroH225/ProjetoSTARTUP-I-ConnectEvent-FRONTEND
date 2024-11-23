import { Component, Input } from '@angular/core';
import { EventosService } from '../../../services/eventos.service'; // Importa o serviço

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  @Input() fotos: any[] = [];
  eventos: any[] = [];
  imagemUrls: string[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.getEventos();
    this.fotos.forEach((foto: any) => {
      this.imagemUrls.push(`http://localhost:3000/uploads/${foto.foto}`);
    });
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
