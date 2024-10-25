import { Component, OnInit } from '@angular/core';
import { TipoEventoService } from '../../../../services/tipo-evento.service';
import { CidadesService } from '../../../../services/cidades.service';
import { FiltrarEventoService } from '../../../../services/filtrar-evento.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  isCollapsed = false; // NAO TIRAR ISSO DAQUI
  tipos: any[] = []; // Variável para armazenar os tipos
  selectedTipo: string = ''; // Variável para armazenar o tipo de evento selecionado
  selectedCidade : string = "";
  cidades: any[] = []

  constructor(private tipoEventoService: TipoEventoService, 
              private cidadesService : CidadesService, 
              private filtrarServico : FiltrarEventoService
            ) {}

  ngOnInit(): void {
    this.getTipoEvento(); // Chamar o método quando o componente for inicializado
    this.getCidades();
  }

  getTipoEvento(): void {
    this.tipoEventoService.getTipoEvento().subscribe(
      (response) => {
        this.tipos = response; // Armazena os eventos recebidos
      },
      (error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
  }

  getCidades(): void {
    this.cidadesService.getCidades().subscribe(
      (response) => {
        this.cidades = response; // Armazena os eventos recebidos
      },
      (error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
  }

  selectedDate: string = ''; // Variável para armazenar a data selecionada

  // Método para filtrar eventos por data
  filtrar(): void {
    this.filtrarServico.filtrar(this.selectedTipo, this.selectedCidade, this.selectedDate).subscribe(
      (response) => {
        console.log('Eventos filtrados:', response);
        // Aqui você pode atualizar uma variável com os eventos filtrados para exibir no template
      },
      (error) => {
        console.error('Erro ao filtrar eventos:', error);
      }
    );
  }
}
