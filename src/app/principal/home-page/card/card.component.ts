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
  @Input() tipo: string = '';
  @Input() endereco: string = '';
  @Input() bairro: string = '';
  @Input() cidade: string = '';
  @Input() estado: string = '';

  tituloEvento: string = '';
  descricaoEvento: string = '';
  idEvento: number = 0;
  tipoEvento: string = '';
  bairroEvento: string = '';
  cidadeEvento: string = '';
  estadoEvento: string = '';

  constructor(private eventosService: EventosService) {}

  getEventoById(id: number): void {
    this.eventosService.getEventoById(id).subscribe(
      (response) => {
        // Todas as informações abaixo devem ser inseridas no "home-page.component.html" também
        this.tituloEvento = response.titulo; // Substituir o título do evento
        this.descricaoEvento = response.descricao;
        this.idEvento = response.id;
        this.tipoEvento = response.tipo;
        this.bairroEvento = response.endereco.bairro;
        this.cidadeEvento = response.endereco.cidade;
        this.estadoEvento = response.endereco.estado;
      },
      (error) => {
        console.error('Erro ao buscar evento:', error);
      }
    );
  }
}
