import { Component } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';
import { EventosService } from '../../../../services/eventos.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { FiltrarEventoService } from '../../../../services/filtrar-evento.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss'
})
export class FeedbacksComponent {
  feedbacks : any[] = [];
  eventos : any[] = [];
  
  selectedEvento !: number;

  constructor(
    private feedbackServico : FeedbackService,
    private eventoServico : EventosService,
    private filtroServico : FiltrarEventoService
  ) {}

  ngOnInit() {
    this.filtroServico.filtrarEventoOcorridos().subscribe(
      (eventos) => {
        this.eventos = eventos;
        
      },
    (error) => {
    })
  }

  getFeedbacksEvento(eventoId : number) {
  this.feedbackServico.visualizarFeedbacksEvento(eventoId).subscribe(
    (feedbacks) => {
      this.feedbacks = feedbacks;
      
    },
  (error) => {
    console.log(error);
    
  })
  }

}
