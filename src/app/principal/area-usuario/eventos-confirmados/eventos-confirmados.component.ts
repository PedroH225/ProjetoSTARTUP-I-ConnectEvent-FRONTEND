import { Component } from '@angular/core';
import { AutenticacaoService } from '../../../../services/autenticacao.service';
import { EventosService } from '../../../../services/eventos.service';

import { FiltrarEventoService } from '../../../../services/filtrar-evento.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { FeedbackService } from '../../../../services/feedback.service';

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

  semFeedback : number[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 0; // Inicialize como 0, será atualizado depois

  constructor(
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private filtroServico: FiltrarEventoService,
    private feedbackServico : FeedbackService
  ) {}

  ngOnInit() {
    this.getEventosParticipando(); // Chama o método para buscar eventos ao inicializar
    this.getSemFeedback()
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

  onSubmit() {
    switch (this.selectedFiltro) {
      case '':
        this.getEventosParticipando();
        this.ocorrido = false;
        break;
      case 'ocorridos':
        this.usuarioService.getEventosParticipandoOcorridos().subscribe(
          (response: any[]) => {
            this.eventos = response; // Armazena os eventos recebidos
            this.collectionSize = this.eventos.length; // Atualiza o tamanho da coleção
            this.refreshPaginatedEventos(); // Atualiza os eventos paginados após buscar
            this.ocorrido = true;
          },
          (error: Error) => {
            console.error('Erro ao buscar eventos:', error);
          }
        );
        break;
    }
  }

  retirarPresenca(id: number) {
    if (
      confirm('Você tem certeza que quer retirar a sua presença no evento?')
    ) {
      this.usuarioService.removerParticipar(id).subscribe(
        () => {
          alert('Presença retirada com sucesso!');
          this.getEventosParticipando();
        },
        (error: Error) => {
          console.error('Erro ao retirar presença:', error);
        }
      );
    }
  }

  adicionarFeedback(id: number) {}

  getSemFeedback() {
    this.feedbackServico.getSemFeedback().subscribe(
      (response) => {
        this.semFeedback = response;
        console.log(this.semFeedback);
        
      },
    (error) => {
      console.log(error);
      
    })
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
