import { Component, Input, OnInit } from '@angular/core';
import { EventosService } from '../../../../services/eventos.service'; // Importar o serviço corretamente

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() titulo: string = ''; // Propriedade para receber o título
  @Input() descricao: string = ''; // Propriedade para receber a descrição
  @Input() id: number = 0; // Propriedade para receber o id

  tituloEvento: string = '';
  descricaoEvento: string = '';
  idEvento: number = 0;

  constructor(private eventosService: EventosService) {}

  getEventoById(id: number): void {
    this.eventosService.getEventoById(id).subscribe(
      (response) => {
        this.tituloEvento = response.titulo; // Substituir o título do evento
        this.descricaoEvento = response.descricao;
        this.idEvento = response.id;
      },
      (error) => {
        console.error('Erro ao buscar evento:', error);
      }
    );
  }
}
