import { Component } from '@angular/core';
import { EventosService } from '../../../../services/eventos.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.scss'
})
export class EstatisticasComponent {

  usuarioEventos : any[] = []

  selectedEvento: string | null = null;
  selectedDados: string | null = null;

  constructor(
    private eventoService : EventosService
  ) {}

  ngOnInit() {
    this.eventoService.getEventosUsuario().subscribe(
      (eventos) => {
        this.usuarioEventos = eventos;

      },
      (error) => {
        console.log(error);
        
      }
    )
  }

  onSubmit() {
    console.log(this.selectedEvento, this.selectedDados);
    
  }
}
