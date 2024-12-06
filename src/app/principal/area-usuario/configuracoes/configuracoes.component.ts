import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CidadesService } from '../../../../services/cidades.service';
import {
  listarErrosAlterarSenha,
  listarErrosUsuario,
} from '../../../utils/listarErros';
import { WallpaperService } from '../../../../../src/services/wallpaper.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent {
  usuario: any;

  nome: string = '';
  email: string = '';
  idade!: number;
  genero: string = '';
  estado: string = '';
  cidade: string = '';

  senhaAtual: string = '';
  senhaNova: string = '';
  confirmarSenha: string = '';

  wallpapers: string[] = [];
  selectedWallpaper: string = '';

  cidades: any[] = [];

  @ViewChild('editModal') editModal: any;
  @ViewChild('alterarSenha') modalSenha: any;
  @ViewChild('wallpaperModal') wallpaperModal: any;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private cidadesService: CidadesService,
    private wallpaperService: WallpaperService
  ) {}

  ngOnInit() {
    this.carregarUsuario();
    this.getCidades();
    this.loadWallpapers();
  }

  loadWallpapers() {
    this.wallpapers = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
  }

  changeWallpaper() {
    const newWallpaper = `assets/wallpapers/${this.selectedWallpaper}`;
    this.wallpaperService.updateWallpaper(newWallpaper);
  }

  onSubmitAlterarWallpaper(modal: any) {
    const newWallpaper = `assets/wallpapers/${this.selectedWallpaper}`;
    this.wallpaperService.updateWallpaper(newWallpaper); // Atualiza o wallpaper no serviço
    modal.close();
  }

  carregarUsuario() {
    this.usuarioService.getUsuarioById().subscribe(
      (usuario) => {
        this.usuario = usuario;

        this.nome = usuario.nome;
        this.email = usuario.email;
        this.idade = usuario.idade;
        this.genero = usuario.genero;
        this.estado = usuario.estado;
        this.cidade = usuario.cidade;
      },
      (error) => {
        console.log(error);

        alert('Erro desconhecido');
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

  openSenhaModal() {
    this.modalService.open(this.modalSenha);
  }

  openWallpaperModal() {
    this.modalService.open(this.wallpaperModal);
  }

  onSubmit(modal: any) {
    // Construindo o payload com os dados do usuário
    const payload = {
      nome: this.nome,
      email: this.email,
      idade: this.idade,
      genero: this.genero,
      estado: this.estado,
      cidade: this.cidade,
    };

    // Enviando o payload ao backend
    this.usuarioService.editarUsuario(payload).subscribe(
      () => {
        alert('Usuário atualizado com sucesso!');
        modal.close();
        this.carregarUsuario();
      },
      (error) => {
        listarErrosUsuario(error.error);
      }
    );
  }

  onSubmitAlterarSenha(modal: any) {
    const payload = {
      senhaAtual: this.senhaAtual,
      senhaNova: this.senhaNova,
      confirmarSenha: this.confirmarSenha,
    };

    // Enviando o payload ao backend
    this.usuarioService.alterarSenha(payload).subscribe(
      () => {
        alert('Senha alterada com sucesso!');
        modal.close();

        this.senhaAtual = '';
        this.senhaNova = '';
        this.confirmarSenha = '';
      },
      (error) => {
        listarErrosAlterarSenha(error.error);
      }
    );
  }
}
