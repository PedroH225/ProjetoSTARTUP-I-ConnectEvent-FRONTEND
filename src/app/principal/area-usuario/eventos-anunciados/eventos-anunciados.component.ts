import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { EventosService } from '../../../../services/eventos.service';

@Component({
  selector: 'app-eventos-anunciados',
  templateUrl: './eventos-anunciados.component.html',
  styleUrls: ['./eventos-anunciados.component.scss']
})
export class EventosAnunciadosComponent implements OnInit {
  eventos: any[] = []; // Array para armazenar eventos
  paginatedEventos: any[] = []; // Array para eventos paginados
  selectedFiltro: string = '';
  page = 1;
  pageSize = 5;
  collectionSize = 0; // Inicialize como 0, será atualizado depois

  constructor(
    private autenticacaoService: AutenticacaoService,
    private eventoService: EventosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEventosUsuario(); // Chama o método para buscar eventos ao inicializar
  }

  getEventosUsuario(): void {
    this.eventoService.getEventosUsuario().subscribe(
      (response: any[]) => {
        this.eventos = response; // Armazena os eventos recebidos
        this.collectionSize = this.eventos.length; // Atualiza o tamanho da coleção
        this.refreshPaginatedEventos(); // Atualiza os eventos paginados após buscar
      },
      (error: Error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
  }

  onSubmit() {
    switch (this.selectedFiltro) {
      case "":
      console.log("todos");
      
        break;
      case "correntes":
      console.log("anunciados");
      
        break;
      case "ocorridos":
      console.log("ocorridossss");
      
        break;
    }

  }

  trackByEventoId(index: number, evento: any): number {
    return evento.id; // Certifique-se de que 'id' é uma propriedade única
  }

  // Método para atualizar eventos paginados
  refreshPaginatedEventos(): void {
    this.paginatedEventos = this.eventos.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  // Método chamado para atualizar eventos e a coleção paginada
  refreshEventos(): void {
    this.refreshPaginatedEventos(); // Atualiza a lista de eventos paginados
  }
}
