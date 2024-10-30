import { Component } from '@angular/core';
import { TipoEventoService } from '../../../../services/tipo-evento.service';
import { CidadesService } from '../../../../services/cidades.service';
import { EventosService } from '../../../../services/eventos.service';

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
  local : string = '';
  estado : string = '';
  selectedCidade : string = '';
  bairro : string = '';
  numero !: number;
  // foto;

  constructor(
    private tipoEventoService: TipoEventoService,
    private cidadesService : CidadesService,
    private eventoService : EventosService
  ) {}

  ngOnInit(): void {
    this.getTipoEvento(); // Chamar o método quando o componente for inicializado
    this.getCidades();
  }

  onSubmit() {
    const payload = {
      titulo: this.titulo,
      descricao: this.descricao,
      data: this.data,
      horario: this.horario,
      tipo: this.selectedTipo,
      telefone: this.telefone,
      livre: this.livre,
      link: this.link,
      fotos: [],
      local: this.local,
      estado: this.estado,
      cidade: this.selectedCidade,
      bairro: this.bairro,
      numero: this.numero,
      usuarioId: 1
    };
    
    this.eventoService.criarEvento(payload).subscribe(
      (response) => {
          alert("Evento criado com sucesso!") 
        console.log(response);
        
      },
      (error) => {
        console.log(error);
        
        // Erro no registro
        let erros: any[] = [];
        erros = error.error // Captura os erros

        console.log(erros);
        //listarErrosEvento(erros)
      }
    );
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

  formatarHorario() {
    // Remove caracteres não numéricos
    this.horario = this.horario.replace(/\D/g, '');

    // Adiciona ":" após os dois primeiros dígitos para o formato "HH:MM"
    if (this.horario.length > 2) {
      this.horario = this.horario.slice(0, 2) + ':' + this.horario.slice(2, 4);
    }
  }

  permitirApenasNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permite apenas números e o caractere ':'
    if ((charCode < 48 || charCode > 57) && charCode !== 58) {
      event.preventDefault();
    }
  }
}

