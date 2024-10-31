import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { EventosService } from '../../../../services/eventos.service';
import { FiltrarEventoService } from '../../../../services/filtrar-evento.service';

@Component({
  selector: 'app-eventos-anunciados',
  templateUrl: './eventos-anunciados.component.html',
  styleUrls: ['./eventos-anunciados.component.scss']
})
export class EventosAnunciadosComponent implements OnInit {
  eventos: any[] = []; // Array para armazenar eventos
  paginatedEventos: any[] = []; // Array para eventos paginados
  selectedFiltro: string = '';
  today: Date = new Date();

  page = 1;
  pageSize = 5;
  collectionSize = 0; // Inicialize como 0, será atualizado depois

  constructor(
    private autenticacaoService: AutenticacaoService,
    private eventoService: EventosService,
    private router: Router,
    private filtroServico : FiltrarEventoService
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

  convertToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
  }

  isEventoInFuture(evento: any): boolean {
    const eventoDate = this.convertToDate(evento.data);
    return eventoDate > this.today;
  }

  onSubmit() {
    switch (this.selectedFiltro) {
      case "":
      this.getEventosUsuario();
        break;
      case "correntes":
        this.filtroServico.filtrarEventoAnunciados().subscribe(
          (response: any[]) => {
            this.eventos = response; // Armazena os eventos recebidos
            this.collectionSize = this.eventos.length; // Atualiza o tamanho da coleção
            this.refreshPaginatedEventos(); // Atualiza os eventos paginados após buscar
          },
          (error: Error) => {
            console.error('Erro ao buscar eventos:', error);
          }
        );
      
        break;
      case "ocorridos":
      this.filtroServico.filtrarEventoOcorridos().subscribe(
      (response: any[]) => {
        this.eventos = response; // Armazena os eventos recebidos
        this.collectionSize = this.eventos.length; // Atualiza o tamanho da coleção
        this.refreshPaginatedEventos(); // Atualiza os eventos paginados após buscar
      },
      (error: Error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
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
