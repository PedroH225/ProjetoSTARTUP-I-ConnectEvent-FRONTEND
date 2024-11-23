import { Component, Input, OnInit } from '@angular/core';

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
  @Input() fotos: any[] = [];
  @Input() participantes: any[] = [];

  imagemUrls: string[] = [];

  ngOnInit() {
    this.fotos.forEach((foto: any) => {
      this.imagemUrls.push(`http://localhost:3000/uploads/${foto.foto}`);
    });
  }
}
