import { Component } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class ConfiguracoesComponent {

  usuario : any;

  constructor(
    private usuarioService : UsuarioService
  ) {}

  ngOnInit() {
    this.usuarioService.getUsuarioById().subscribe(
      (usuario) => {
        this.usuario = usuario;
        
      },
      (error) => {
        alert("Erro desconhecido")
      }
    )
  }

}
