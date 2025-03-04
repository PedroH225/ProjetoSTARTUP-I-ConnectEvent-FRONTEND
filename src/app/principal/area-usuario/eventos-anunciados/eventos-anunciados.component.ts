import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { EventosService } from '../../../../services/eventos.service';
import { FiltrarEventoService } from '../../../../services/filtrar-evento.service';

@Component({
  selector: 'app-eventos-anunciados',
  templateUrl: './eventos-anunciados.component.html',
  styleUrls: ['./eventos-anunciados.component.scss'],
})
export class EventosAnunciadosComponent implements OnInit {
  eventos: any[] = []; // Array para armazenar eventos
  paginatedEventos: any[] = []; // Array para eventos paginados
  selectedFiltro : string = '';
  today: Date = new Date();

  page = 1;
  pageSize = 5;
  collectionSize = 0; // Inicialize como 0, será atualizado depois

  constructor(
    private autenticacaoService: AutenticacaoService,
    private eventoService: EventosService,
    private router: Router,
    private filtroServico: FiltrarEventoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedFiltro = params['filtro'] || ''; // Restaura o filtro
      this.page = +params['page'] || 1; // Restaura a página
      this.onSubmit(); // Aplica o filtro restaurado      
    });
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
    this.router.navigate([], {
      queryParams: { filtro: this.selectedFiltro, page: this.page },
      queryParamsHandling: 'merge', // Preserva outros parâmetros
    });

    switch (this.selectedFiltro) {
      case '':
        this.getEventosUsuario();
        break;
      case 'correntes':
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
      case 'ocorridos':
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
      case 'Nanunciado':
        this.filtroServico.filtrarEventoNaoAnunciados().subscribe(
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

  convertToDate(dateString: string): Date {
    const [day, month, year] = dateString
      .split('/')
      .map((part) => parseInt(part, 10));
    return new Date(year, month - 1, day);
  }

  isEventoInFuture(evento: any): boolean {
    const eventoDate = this.convertToDate(evento.data);
    return eventoDate > this.today;
  }

  excluirEvento(id: number) {
    if (confirm('Excluir o evento?')) {
      this.eventoService.excluirEvento(id).subscribe(
        () => {
          this.getEventosUsuario();
        },
        (error: Error) => {
          alert('Erro ao excluir evento.');
        }
      );
    }
  }

  anunciarEvento(id: number) {
    if (confirm('Anunciar o evento? Essa ação não pode ser revertida.')) {
      this.eventoService.anunciarEvento(id).subscribe(
        () => {
          this.getEventosUsuario();
        },
        (error: Error) => {
          alert('Erro ao anunciar evento.');
        }
      );
    }
  }

  trackByEventoId(index: number, evento: any): number {
    return evento.id; // Certifique-se de que 'id' é uma propriedade única
  }

  // Método para atualizar eventos paginados
  refreshPaginatedEventos(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = this.page * this.pageSize;
    this.paginatedEventos = this.eventos.slice(startIndex, endIndex);
  }
  

  // Método chamado para atualizar eventos e a coleção paginada
  refreshEventos(): void {
    this.router.navigate([], {
      queryParams: { filtro: this.selectedFiltro, page: this.page },
      queryParamsHandling: 'merge', // Preserva outros parâmetros
    });

    this.refreshPaginatedEventos(); // Atualiza a lista de eventos paginados
  }
}
