import { Component } from '@angular/core';
import { TipoEventoService } from '../../../../services/tipo-evento.service';
import { CidadesService } from '../../../../services/cidades.service';
import { EventosService } from '../../../../services/eventos.service';
import { listarErrosEvento } from '../../../utils/listarErros';
import { ActivatedRoute, Router } from '@angular/router';


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
  dataString : string = '';
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
  eventoId: string | null = null;

  constructor(
    private tipoEventoService: TipoEventoService,
    private cidadesService : CidadesService,
    private eventoService : EventosService,
    private route: ActivatedRoute,
    private router: Router          

  ) {}

  ngOnInit(): void {
    this.getTipoEvento(); // Chamar o método quando o componente for inicializado
    this.getCidades();

    this.eventoId = this.route.snapshot.paramMap.get('id');
    if (this.eventoId) {
      const botao = document.querySelector("#botaoSubmit")
      const h1 = document.querySelector("#editarcriar")
      if (botao && h1) {
        botao.innerHTML = "Editar"
        h1.innerHTML = "Editar evento"
      }
      this.carregarEvento(this.eventoId);
    }
  }

  onSubmit() {
    const payload = {
      titulo: this.titulo,
      descricao: this.descricao,
      data: this.dataString,
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
    };
    
    if (this.eventoId) {
      this.eventoService.editarEvento(parseInt(this.eventoId), payload).subscribe(
        (response) => {
          console.log(response);
            this.router.navigate(["/principal/areaUsuario/eventosAnunciados"])
            alert("Evento editado com sucesso!") 
        },
        (error) => {
          console.log(error);
          let erros: any[] = [];
          erros = error.error // Captura os erros
  
          console.log(erros);
          listarErrosEvento(erros)
        }
      );
    } else {
    this.eventoService.criarEvento(payload).subscribe(
      () => {
          alert("Evento criado com sucesso!")

      },
      (error) => {
        console.log(error);
        let erros: any[] = [];
        erros = error.error // Captura os erros

        console.log(erros);
        listarErrosEvento(erros)
      }
    );
  }
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

  carregarEvento(id: string): void {
    this.eventoService.getEventoById(parseInt(id)).subscribe(
      (response) => {
        console.log(response);
        console.log("Conversão: " + this.convertStringToDate(response.data));
        
        
        // Carregar os dados do evento no formulário
        this.titulo = response.titulo;
        this.descricao = response.descricao;
        this.data = this.convertStringToDate(response.data); // Armazena como Date

        // Atribuir a data formatada como string para o input
        this.dataString = this.convertDateToString(this.data); // Nova propriedade para o input de data
        this.horario = response.horario;
        this.selectedTipo = response.tipo;
        this.telefone = response.telefone;
        this.livre = response.livre;
        this.link = response.link;
        this.local = response.endereco.local;
        this.estado = response.endereco.estado;
        this.selectedCidade = response.endereco.cidade;
        this.bairro = response.endereco.bairro;
        this.numero = response.endereco.numero;
      },
      (error) => {
        console.error('Erro ao carregar evento:', error);
      }
    );
  }

  convertStringToDate(dateString: string): Date {
    const parts = dateString.split('/');
    // O construtor Date usa o formato (ano, mês - 1, dia)
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }
  
  convertDateToString(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

