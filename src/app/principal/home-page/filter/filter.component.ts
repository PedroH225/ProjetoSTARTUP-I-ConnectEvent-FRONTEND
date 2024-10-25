import { Component, OnInit } from '@angular/core';
import { TipoEventoService } from '../../../../services/tipo-evento.service';
import { CidadesService } from '../../../../services/cidades.service';

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

  constructor(private tipoEventoService: TipoEventoService, private cidadesService : CidadesService) {}

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
  filtrarPorData(): void {
    if (this.selectedDate) {
      console.log('Data selecionada:', this.selectedDate);
      // Aqui você pode aplicar o filtro de eventos com base na data
      // Chame o serviço que filtra os eventos pelo backend, por exemplo.
    } else {
      console.error('Nenhuma data foi selecionada');
    }
  }
}
