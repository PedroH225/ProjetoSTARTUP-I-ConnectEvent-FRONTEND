import { Component, ViewChild } from '@angular/core';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { EventosService } from '../../../../services/eventos.service';

import { FiltrarEventoService } from '../../../../services/filtrar-evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { FeedbackService } from '../../../../services/feedback.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-eventos-confirmados',
  templateUrl: './eventos-confirmados.component.html',
  styleUrl: './eventos-confirmados.component.scss',
})
export class EventosConfirmadosComponent {
  eventos: any[] = []; // Array para armazenar eventos
  paginatedEventos: any[] = []; // Array para eventos paginados
  selectedFiltro: string = '';
  today: Date = new Date();
  ocorrido: boolean = false;

  comentario: string = '';
  nota !: number;

  selectedEventoId !: number;

  @ViewChild('addFeedback') addFeedbackModal: any;


  semFeedback: number[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 0; // Inicialize como 0, será atualizado depois

  constructor(
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private filtroServico: FiltrarEventoService,
    private feedbackServico: FeedbackService,
    private modalService: NgbModal,
    private route : ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedFiltro = params['filtro'] || ''; // Restaura o filtro
      this.page = +params['page'] || 1; // Restaura a página
      this.onSubmit(); // Aplica o filtro restaurado      
    });    
    this.getSemFeedback();
  }

  getEventosParticipando(): void {
    this.usuarioService.getEventosParticipando().subscribe(
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

  getEventosParticipandoOcorridos(): void {
    this.usuarioService.getEventosParticipandoOcorridos().subscribe(
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

  async getEventosSemFiltro() {
    this.eventos = []; // Limpa os eventos antes de buscar novamente
  
    // Usando forkJoin para combinar as chamadas de API assíncronas
    forkJoin({
      eventosFuturos: this.usuarioService.getEventosParticipando(),
      eventosOcorridos: this.usuarioService.getEventosParticipandoOcorridos()
    }).subscribe(
      ({ eventosFuturos, eventosOcorridos }) => {
        // Combina os dois arrays sem duplicação
        this.eventos = [...eventosFuturos, ...eventosOcorridos];
        this.collectionSize = this.eventos.length;
        this.refreshPaginatedEventos(); // Atualiza os eventos paginados
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
      this.getEventosSemFiltro()
        break;
      case 'futuros':
        this.getEventosParticipando();
        break;
      case 'ocorridos':
        this.getEventosParticipandoOcorridos()
        break;
    }

    this.getSemFeedback();
  }

  retirarPresenca(id: number) {
    if (
      confirm('Você tem certeza que quer retirar a sua presença no evento?')
    ) {
      this.usuarioService.removerParticipar(id).subscribe(
        () => {
          alert('Presença retirada com sucesso!');
          if (this.selectedFiltro === "futuros") {
            this.getEventosParticipando();
          } else {
            this.getEventosSemFiltro()
          }
        },
        (error: Error) => {
          console.error('Erro ao retirar presença:', error);
        }
      );
    }
  }

  adicionarFeedback(modal: any, id: number) {
    const payload = {
      comentario: this.comentario,
      nota: this.nota
    }

    this.feedbackServico.adicionarFeedback(id, payload).subscribe(
      () => {
        alert("Feedback enviado com sucesso.")
        modal.close()

        this.getSemFeedback();
        if (this.selectedFiltro === "ocorridos") {
          this.getEventosParticipandoOcorridos();
        } else {
          this.getEventosSemFiltro()
        }
        
        this.comentario = ''
        this.nota = 0

      },
      (error) => {
        alert("Erro ao enviar feedback.")
      })
  }


  getSemFeedback() {
    this.feedbackServico.getSemFeedback().subscribe(
      (response) => {
        this.semFeedback = response;

      },
      (error) => {
        console.log(error);

      })
  }

  openAddFeedbackModal(eventoId: number) {
    this.selectedEventoId = eventoId;
    this.modalService.open(this.addFeedbackModal)
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

  trackByEventoId(index: number, evento: any): number {
    return evento.id; // Certifique-se de que 'id' é uma propriedade única
  }

  // Método para atualizar eventos paginados
  refreshPaginatedEventos(): void {
    this.paginatedEventos = this.eventos.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  // Método chamado para atualizar eventos e a coleção paginada
  refreshEventos(): void {
    this.refreshPaginatedEventos(); // Atualiza a lista de eventos paginados
  }
}
