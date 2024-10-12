import { Component, Input, OnInit } from '@angular/core';
import { TipoEventoService } from '../../../../../services/tipo-evento.service'; // Importar o tipo de evento

@Component({
  selector: 'app-button-tipo',
  templateUrl: './button-tipo.component.html',
  styleUrl: './button-tipo.component.scss',
})
export class ButtonTipoComponent {
  @Input() tipo: string = ''; // Propriedade para receber o tipo
  @Input() id: number = 0; // Propriedade para receber o id

  tipoEvento: string = '';
  idTipo: number = 0;

  constructor(private tipoEventoService: TipoEventoService) {}

  getTipoEvento(): void {
    this.tipoEventoService.getTipoEvento().subscribe(
      (response) => {
        this.tipoEvento = response[0].tipo; // Substituir o título do evento
        this.idTipo = response[0].id;
      },
      (error) => {
        console.error('Erro ao buscar evento:', error);
      }
    );
  }
}
