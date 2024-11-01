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
  tipos: any[] = [];
  cidades: any[] = [];


  tipoTelefone: string = '';
  telefoneHabilitado: boolean = false; // Define se o campo de telefone está habilitado

  titulo: string = '';
  descricao: string = '';
  data !: Date;
  dataString: string = '';
  horario: string = '';
  selectedTipo: string = '';
  telefone: string = '';
  livre !: boolean;
  link: string = '';
  local: string = '';
  estado: string = '';
  selectedCidade: string = '';
  bairro: string = '';
  numero !: number;
  fotos : File[] = []
  eventoId: string | null = null;

  constructor(
    private tipoEventoService: TipoEventoService,
    private cidadesService: CidadesService,
    private eventoService: EventosService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

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
    const payload = new FormData();
  
  // Adiciona os campos de dados ao FormData
  payload.append('titulo', this.titulo);
  payload.append('descricao', this.descricao);
  payload.append('data', this.dataString);
  payload.append('horario', this.horario);
  payload.append('tipo', this.selectedTipo);
  payload.append('telefone', this.telefone);
  payload.append('livre', String(this.livre));
  payload.append('link', this.link);
  payload.append('local', this.local);
  payload.append('estado', this.estado);
  payload.append('cidade', this.selectedCidade);
  payload.append('bairro', this.bairro);
  payload.append('numero', String(this.numero));

  // Adiciona as fotos ao FormData
  for (const foto of this.fotos) {
    payload.append('fotos', foto); // O nome 'fotos' deve ser o esperado pelo seu backend
  }
  
    if (this.eventoId) {
      this.eventoService.editarEvento(parseInt(this.eventoId), payload).subscribe(
        () => {
          this.router.navigate(["/principal/areaUsuario/eventosAnunciados"])
          alert("Evento editado com sucesso!")
        },
        (error) => {

          let erros: any[] = [];
          erros = error.error // Captura os erros

          listarErrosEvento(erros)
        }
      );
    } else {
      this.eventoService.criarEvento(payload).subscribe(
        () => {
          alert("Evento criado com sucesso!")

        },
        (error) => {
          let erros: any[] = [];
          erros = error.error // Captura os erros

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

  formatarTelefone(event: any) {
    let numero = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    // Limita a 11 dígitos para celular ou 10 para fixo
    if (this.tipoTelefone === 'celular') {
      if (numero.length > 11) {
        numero = numero.slice(0, 11); // Limita a 11 dígitos
      }
    } else {
      if (numero.length > 10) {
        numero = numero.slice(0, 10); // Limita a 10 dígitos
      }
    }

    // Formatação
    if (this.tipoTelefone === 'celular') {
      this.telefone = numero.replace(/(\d{2})(\d)/, '($1) $2') // Adiciona a DDD
        .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen
    } else {
      this.telefone = numero.replace(/(\d{2})(\d)/, '($1) $2') // Adiciona a DDD
        .replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona o hífen
    }
  }

  onTipoTelefoneChange() {
    this.telefoneHabilitado = !!this.tipoTelefone; // Habilita o campo apenas se um tipo for selecionado
  }

  // Retorna o valor do maxlength baseado no tipo de telefone
  getMaxLength(): number {
    return this.tipoTelefone === 'celular' ? 15 : 14; // 15 para celular (11 dígitos + 4 para máscara), 14 para fixo (10 dígitos + 4 para máscara)
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.fotos = []; // Limpar fotos anteriores
  
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Verificar se o arquivo é uma imagem (opcional)
        if (file.type.startsWith('image/')) {
          this.fotos.push(file); // Adiciona o arquivo ao array de fotos
        }
      }
    }
  }
}