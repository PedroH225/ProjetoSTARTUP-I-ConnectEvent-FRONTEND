import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar para acessar os parâmetros da URL
import { EventosService } from '../../../services/eventos.service'; // Importa o serviço
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {
  public autenticacao$ = this.autenticacaoService.autenticacao$;
  desabilitarBotao: boolean = false;
  habilitarBotao: boolean = true;
  evento: any;
  tipo!: string;

  constructor(
    private route: ActivatedRoute, // Necessário para capturar o parâmetro da URL
    private autenticacaoService: AutenticacaoService,
    private eventosService: EventosService,
    private usuarioService: UsuarioService // Serviço para buscar o evento
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEventoById(+id);
      this.autenticacao$.subscribe((autenticado) => {
        if (autenticado) {
          // O usuário está autenticado, verifica a presença
          this.eventosService
            .verificarPresenca(parseInt(id))
            .subscribe((resposta: { estaParticipando: boolean }) => {
              this.desabilitarBotao = resposta.estaParticipando; // Atribui o valor retornado à variável
            });
        }
      });
    }
  }

  participar() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.participar(parseInt(id)).subscribe(
        (response) => {
          this.desabilitarBotao = true;
          alert(response.message);
        },
        (error) => {
          alert(error);
        }
      );
    }
  }

  removerParticipar() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.removerParticipar(parseInt(id)).subscribe(
        (response) => {
          this.desabilitarBotao = false;
          alert(response.message);
        },
        (error) => {
          alert(error);
        }
      );
    }
  }

  getEventoById(id: number): void {
    this.eventosService.getEventoById(id).subscribe(
      (response) => {
        this.evento = response; // Armazena os dados do evento
        this.tipo = response.tipo;
      },
      (error) => {
        console.error('Erro ao buscar evento:', error);
      }
    );

    let cor;

    switch (this.tipo) {
      case 'Artístico':
        break;
      case 'Balada':
        break;
      case 'Cultural':
        break;
      case 'Educacional':
        break;
      case 'Esportivo':
        break;
      case 'Gastronômico':
        break;
      case 'Jogo':
        break;
      case 'Oficial':
        break;
      case 'Profissional':
        break;
      case 'Religioso':
        break;
      case 'Show':
        break;
      case 'Social':
        break;
      case 'Stand-Up':
        break;
      case 'Técnico-Científico':
        break;
    }
  }
}
