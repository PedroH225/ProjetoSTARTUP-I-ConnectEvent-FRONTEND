import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CidadesService } from '../../../../services/cidades.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {

  usuario: any;

  nome : string = '';
  email : string = '';
  idade !: number;
  genero : string = '';
  estado : string = '';
  cidade : string = '';

  cidades : any[] = []


  @ViewChild('editModal') editModal: any;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private cidadesService : CidadesService
  ) {}

  ngOnInit() {
    this.carregarUsuario();
    this.getCidades();
  }

  carregarUsuario() {
    this.usuarioService.getUsuarioById().subscribe(
      (usuario) => {
        this.usuario = usuario;

        this.nome = usuario.nome
        this.email = usuario.email
        this.idade = usuario.idade
        this.genero = usuario.genero
        this.estado = usuario.estado
        this.cidade = usuario.cidade

        
      },
      (error) => {
        alert("Erro desconhecido");
      }
    );
  }

  getCidades(): void {
    this.cidadesService.getCidades().subscribe(
      (response) => {
        this.cidades = response;
      },
      (error) => {
        console.error('Erro ao buscar cidades:', error);
      }
    );
  }

  openEditModal() {
    this.modalService.open(this.editModal);
  }

  onSubmit(modal: any) {
    // Construindo o payload com os dados do usuário
    const payload = {
      nome: this.nome,
      email: this.email,
      idade: this.idade,
      genero: this.genero,
      estado: this.estado,
      cidade: this.cidade
    };

    // Enviando o payload ao backend
    this.usuarioService.editarUsuario(payload).subscribe(
      () => {
        alert("Usuário atualizado com sucesso!");
        modal.close();
        this.carregarUsuario();
      },
      (error) => {
        alert("Erro ao atualizar usuário");
      }
    );
  }
}
