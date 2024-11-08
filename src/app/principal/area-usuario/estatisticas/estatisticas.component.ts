import { Component } from '@angular/core';
import { EventosService } from '../../../../services/eventos.service';
import { EstatisticasService } from '../../../../services/estatisticas.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.scss'
})
export class EstatisticasComponent {

  usuarioEventos : any[] = []

  selectedEvento: string | null = null;
  selectedDados: string | null = null;

  graficoImg : any;

  constructor(
    private eventoService : EventosService,
    private estatisticaService : EstatisticasService
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
    switch (this.selectedDados) {
      case "genero":
        this.estatisticaService.getPizzaGenero(parseInt(this.selectedEvento)).subscribe(
          (grafico) => {
            
          },
          (error) => {
            
          }
        )
        break;

      case "idade":
        
        break;

      case "participantess":
        
        break;
      
    }
    
  }
}
