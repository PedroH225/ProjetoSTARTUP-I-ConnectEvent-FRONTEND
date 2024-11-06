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
  @Input() imagem: string = '';
  @Input() participantes : any[] = [];

}
