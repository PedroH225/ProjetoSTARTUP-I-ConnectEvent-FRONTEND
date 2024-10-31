import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { response } from 'express';
import { AutenticacaoService } from '../../../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  selectedOption: string = 'usuario';
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private autenticacaoService : AutenticacaoService
  )
   {} // Injeta o serviço de roteamento

  onSubmit() {
    const payload = {
      email: this.email,
      senha: this.senha
    }

    this.usuarioService.login(payload).subscribe(
      (response) => {
        localStorage.setItem("token", response.token)
        this.autenticacaoService.verificarAutenticacao(); // Atualiza o estado da autenticação
        this.router.navigate(["/principal/areaUsuario"])
      },
      (error) => {
        alert("erro!")
      }
    )
  }
}
