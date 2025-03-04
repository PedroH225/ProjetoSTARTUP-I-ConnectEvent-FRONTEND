import { Component, ViewChild } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedbacks-usuario',
  templateUrl: './feedbacks-usuario.component.html',
  styleUrl: './feedbacks-usuario.component.scss'
})
export class FeedbacksUsuarioComponent {
  selectedFeedbackId !: number;
  feedbacks : any[] = [];
  feedback : any;

  comentario : string = '';
  nota !: number;

  @ViewChild('editFeedback') editFeedbackModal: any;

  constructor(
    private feedbackServico : FeedbackService,
    private modalService : NgbModal
  ) {}

  ngOnInit() {
    this.visualizarFeedbacksUsuario();
  }

  visualizarFeedbacksUsuario() {
    this.feedbackServico.visualizarFeedbacksUsuario().subscribe(
      (feedbacks) => {
        this.feedbacks = feedbacks
        console.log(feedbacks);
        
      },
    (error) => {
      console.log(error);
      
    })
  }

  openAddFeedbackModal(feedbackId: number) {
    this.selectedFeedbackId = feedbackId;
    this.carregarFeedback(feedbackId);

    this.modalService.open(this.editFeedbackModal)
  }

  editarFeedback(modal : any) {
    const payload = {
      comentario : this.comentario,
      nota : this.nota
    }

    this.feedbackServico.editarFeedback(this.selectedFeedbackId, payload).subscribe(
      () => {
        alert("Feedback editado com sucesso.");
        this.visualizarFeedbacksUsuario()

        this.comentario = ''
        this.nota = 0

        this.modalService.dismissAll();
      },
    (error) => {
      console.log(error);
      
    })
  }

  carregarFeedback(feedbackId : number) {
    this.feedbackServico.getById(feedbackId).subscribe(
      (feedback : any) => {
        this.feedback = feedback;

        this.comentario = feedback.comentario;
        this.nota = feedback.nota;
      },
    (error) => {
      console.log(error);
      
    })
  }

  excluirFeedback(feedbackId : number) {
    if (confirm("Deseja excluir o feedback?")) {
      this.feedbackServico.excluirFeedback(feedbackId).subscribe(
        () => {
          alert("Feedback excluído com sucesso.")

          this.visualizarFeedbacksUsuario();
        },
      (error) => {
        console.log(error);
        
      })
    }
  }
}
