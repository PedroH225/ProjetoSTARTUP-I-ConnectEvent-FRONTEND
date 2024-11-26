import { Component, Input } from '@angular/core';
import { EventosService } from '../../../../services/eventos.service';

@Component({
  selector: 'app-carousel-destaque',
  templateUrl: './carousel-destaque.component.html',
  styleUrl: './carousel-destaque.component.scss',
})
export class CarouselDestaqueComponent {
  eventosDestaque: any[] = [];
  imagemEventoUrl: string[] = [];

  constructor(private eventoServico: EventosService) {}

  ngOnInit(): void {
    this.eventoServico.getEventosDestaque().subscribe(
      (eventos) => {
        this.eventosDestaque = eventos;
      },
      (error) => {}
    );
  }
}
