import { Component, OnInit } from '@angular/core';
import { AmizadeService } from '../../../../services/amizade.service';
import { listarErrosAmizade } from '../../../utils/listarErros';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-de-amigos',
  templateUrl: './lista-de-amigos.component.html',
  styleUrls: ['./lista-de-amigos.component.scss'],
})
export class ListaDeAmigosComponent implements OnInit {
  amigos: any[] = [];
  amigosPendente: any[] = [];
  amigosRecebido: any[] = [];
  paginatedAmigos: any[] = [];
  paginatedPendente: any[] = [];
  paginatedRecebido: any[] = [];

  newFriendEmail: string = '';

  eventosAmigo : any[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(
    private amizadeService: AmizadeService,
    private modalService : NgbModal,
    private router : Router
  ) {}

  ngOnInit() {
    this.refreshAmigos(); // Carrega a lista de amigos ao iniciar o componente
    this.refreshPendentes();
    this.refreshRecebidos();
  }

  addFriend() {
    if (this.newFriendEmail) {
      this.amizadeService.enviarPedidoAmizade(this.newFriendEmail).subscribe(
        (response) => {
          this.newFriendEmail = ''; // Limpa o campo após enviar
          this.refreshPendentes(); // Recarrega a lista de amigos
          alert("Pedido de amizade enviado.")
        },
        (error) => {          
          listarErrosAmizade(error)
        }
      );
    }
  }

  private refreshAmigos() {
    this.amizadeService.getPedidosAceitos().subscribe(
      (amigos) => {
        this.amigos = amigos;
        this.collectionSize = this.amigos.length;
        this.refreshPaginatedAmigos();
      },
      (error) => {
        console.error('Erro ao carregar amigos', error);
      }
    );
  }

  private refreshPendentes() {
    this.amizadeService.getPedidosPendentes().subscribe(
      (amigos) => {
        this.amigosPendente = amigos;
        this.collectionSize = this.amigosPendente.length;
        this.refreshPaginatedPendente();
      },
      (error) => {
        console.error('Erro ao carregar amigos pendentes', error);
      }
    );
  }

  private refreshRecebidos() {
    this.amizadeService.getPedidosRecebidos().subscribe(
      (amigos) => {
        this.amigosRecebido = amigos;
        this.collectionSize = this.amigosRecebido.length;
        this.refreshPaginatedRecebido();
      },
      (error) => {
        console.error('Erro ao carregar amigos recebidos', error);
      }
    );
  }

  refreshPaginatedAmigos(): void {
    this.paginatedAmigos = this.amigos.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  refreshPaginatedPendente(): void {
    this.paginatedPendente = this.amigosPendente.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  refreshPaginatedRecebido(): void {
    this.paginatedRecebido = this.amigosRecebido.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  refreshListaAmigo(): void {
    this.refreshPaginatedAmigos();
  }

  refreshListaPendente(): void {
    this.refreshPaginatedPendente();
  }

  refreshListaRecebido(): void {
    this.refreshPaginatedRecebido();
  }

  aceitarPedido(remetenteId: number) {
    this.amizadeService.aceitarPedidoAmizade(remetenteId).subscribe(
      (response) => {
        console.log(response);
        this.refreshRecebidos(); // Atualiza lista de pedidos recebidos
        this.refreshAmigos(); // Atualiza lista de amigos após aceitar
      },
      (error) => {
        console.error('Erro ao aceitar pedido', error);
      }
    );
  }

  excluirPedido(remetenteId: number) {
    this.amizadeService.excluirPedidoAmizade(remetenteId).subscribe(
      (response) => {
        console.log(response);
        this.refreshRecebidos(); // Atualiza lista de pedidos recebidos
      },
      (error) => {
        console.error('Erro ao excluir pedido', error);
      }
    );
  }

  visualizarParticipados(id:number, content : any) {
    this.amizadeService.getEventosParticipandoAmigo(id).subscribe(
      (eventos) => {
        this.eventosAmigo = eventos;
        console.log(this.eventosAmigo);
        
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      },
      (error) => {

      }
    )
  }

  navegarParaEvento(id : number) {
    this.modalService.dismissAll()

    this.router.navigate(['/principal/cardPage', id])
  }
}
