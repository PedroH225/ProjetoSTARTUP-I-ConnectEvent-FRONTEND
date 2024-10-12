import { Component, Input, OnInit } from '@angular/core';
import { EventosService } from '../../../../services/teste.service'; // Importar o serviço corretamente

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() titulo: string = ''; // Propriedade para receber o título
  @Input() descricao: string = ''; // Propriedade para receber a descrição

  tituloEvento: string = '';
  descricaoEvento: string = '';

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.getEventoById(2); // Pegar o evento com id = 2
  }

  getEventoById(id: number): void {
    this.eventosService.getEventoById(id).subscribe(
      (response) => {
        this.tituloEvento = response.titulo; // Substituir o título do evento
        this.descricaoEvento = response.descricao;
      },
      (error) => {
        console.error('Erro ao buscar evento:', error);
      }
    );
  }
}
