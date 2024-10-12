import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar para acessar os parâmetros da URL
import { EventosService } from '../../../services/eventos.service'; // Importa o serviço

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {
  evento: any;

  constructor(
    private route: ActivatedRoute, // Necessário para capturar o parâmetro da URL
    private eventosService: EventosService // Serviço para buscar o evento
  ) {}

  ngOnInit(): void {
    // Captura o ID da rota e carrega o evento correto
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEventoById(+id); // Converte o ID para number e busca o evento
    }
  }

  getEventoById(id: number): void {
    this.eventosService.getEventoById(id).subscribe(
      (response) => {
        this.evento = response; // Armazena os dados do evento
      },
      (error) => {
        console.error('Erro ao buscar evento:', error);
      }
    );
  }
}
