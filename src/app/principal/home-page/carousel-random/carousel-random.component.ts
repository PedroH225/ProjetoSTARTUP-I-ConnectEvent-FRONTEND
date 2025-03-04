import { Component } from '@angular/core';
import { EventosService } from '../../../../services/eventos.service';

@Component({
  selector: 'app-carousel-random',
  templateUrl: './carousel-random.component.html',
  styleUrl: './carousel-random.component.scss'
})
export class CarouselRandomComponent {
  paused = false;

  eventosRandom : any[] = []

  constructor(
    private eventoServico : EventosService
  ) {}

  ngOnInit() {
    this.eventoServico.getEventosRandom().subscribe(
      (eventos) => {
        this.eventosRandom = eventos;
        console.log(this.eventosRandom);
        
      },
    (error) => {

    })
  }
}
