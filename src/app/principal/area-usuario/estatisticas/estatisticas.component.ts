import { Component } from '@angular/core';
import { EventosService } from '../../../../services/eventos.service';
import { EstatisticasService } from '../../../../services/estatisticas.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.scss',
})
export class EstatisticasComponent {
  usuarioEventos: any[] = [];

  selectedEvento!: number;
  selectedEvento2!: number;
  selectedDados: string | null = null;
  selectedDados2: string | null = null;

  graficoImg: string | undefined;
  graficoImg2: string | undefined;


  constructor(
    private eventoService: EventosService,
    private estatisticaService: EstatisticasService
  ) {}

  ngOnInit() {
    this.eventoService.getEventosUsuario().subscribe(
      (eventos) => {
        this.usuarioEventos = eventos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    switch (this.selectedDados) {
      case 'genero':
        this.estatisticaService.getPizzaGenero(this.selectedEvento).subscribe(
          (grafico: Blob) => {
            const objectURL = URL.createObjectURL(grafico);
            this.graficoImg = objectURL;
          },
          (error) => {
            console.log(error);
          }
        );
        break;

      case 'idade':
        this.estatisticaService
          .getHistogramaIdade(this.selectedEvento)
          .subscribe(
            (grafico: Blob) => {
              const objectURL = URL.createObjectURL(grafico);
              this.graficoImg = objectURL;
            },
            (error) => {
              console.log(error);
            }
          );
        break;

      case 'participantes':
        this.estatisticaService
          .getLinhaParticipantes(this.selectedEvento)
          .subscribe(
            (grafico: Blob) => {
              const objectURL = URL.createObjectURL(grafico);
              this.graficoImg = objectURL;
            },
            (error) => {
              console.log(error);
            }
          );
        break;
    }
  }

  onSubmit2() {
    switch (this.selectedDados2) {
      case 'genero':
        this.estatisticaService.getPizzaGenero(this.selectedEvento2).subscribe(
          (grafico: Blob) => {
            const objectURL = URL.createObjectURL(grafico);
            this.graficoImg2 = objectURL;
          },
          (error) => {
            console.log(error);
          }
        );
        break;

      case 'idade':
        this.estatisticaService
          .getHistogramaIdade(this.selectedEvento2)
          .subscribe(
            (grafico: Blob) => {
              const objectURL = URL.createObjectURL(grafico);
              this.graficoImg2 = objectURL;
            },
            (error) => {
              console.log(error);
            }
          );
        break;

      case 'participantes':
        this.estatisticaService
          .getLinhaParticipantes(this.selectedEvento2)
          .subscribe(
            (grafico: Blob) => {
              const objectURL = URL.createObjectURL(grafico);
              this.graficoImg2 = objectURL;
            },
            (error) => {
              console.log(error);
            }
          );
        break;
    }
  }
}
