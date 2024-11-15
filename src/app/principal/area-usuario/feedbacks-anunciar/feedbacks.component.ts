import { Component } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';
import { EventosService } from '../../../../services/eventos.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss'
})
export class FeedbacksComponent {

  eventos : any[] = [];
  
  selectedEvento !: number;

  constructor(
    private feedbackServico : FeedbackService,
    private eventoServico : EventosService
  ) {}

  ngOnInit() {
    this.eventoServico.getEventosUsuario().subscribe(
      (eventos) => {
        this.eventos = eventos
        console.log(this.eventos);
        
      },
    (error) => {
    })
  }

  getFeedbacksEvento(eventoId : number) {
    console.log(eventoId);
    
  }

}
