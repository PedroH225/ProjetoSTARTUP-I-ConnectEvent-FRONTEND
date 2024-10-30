import { Component } from '@angular/core';
import { TipoEventoService } from '../../../../services/tipo-evento.service';
import { CidadesService } from '../../../../services/cidades.service';

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrl: './criar-evento.component.scss'
})
export class CriarEventoComponent {
  tipos : any[] = [];
  cidades : any[] = [];

  titulo : string = '';
  descricao : string = '';
  data !: Date;
  horario : string = '';
  selectedTipo : string = '';
  telefone : string = '';
  livre !: boolean;
  link : string = '';
  rua : string = '';
  estado : string = '';
  selectedCidade : string = '';
  bairro : string = '';
  numero !: number;
  // foto;

  constructor(
    private tipoEventoService: TipoEventoService,
    private cidadesService : CidadesService
  ) {}

  ngOnInit(): void {
    this.getTipoEvento(); // Chamar o método quando o componente for inicializado
    this.getCidades();
  }

  onSubmit() {
    console.log({
      titulo: this.titulo,
      descricao: this.descricao,
      data: this.data,
      horario: this.horario,
      tipo: this.selectedTipo,
      telefone: this.telefone,
      livre: this.livre,
      link: this.link,
      rua: this.rua,
      estado: this.estado,
      cidade: this.selectedCidade,
      bairro: this.bairro,
      numero: this.numero
    });
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
}

