import { Component } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';

@Component({
  selector: 'app-feedbacks-usuario',
  templateUrl: './feedbacks-usuario.component.html',
  styleUrl: './feedbacks-usuario.component.scss'
})
export class FeedbacksUsuarioComponent {
  feedbacks : any[] = [];

  constructor(
    private feedbackServico : FeedbackService
  ) {}

  ngOnInit() {
    this.feedbackServico.visualizarFeedbacksUsuario().subscribe(
      (feedbacks) => {
        this.feedbacks = feedbacks
        console.log(feedbacks);
        
      },
    (error) => {
      console.log(error);
      
    })
  }
}
