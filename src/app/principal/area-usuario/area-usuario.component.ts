import { Component } from '@angular/core';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-usuario',
  templateUrl: './area-usuario.component.html',
  styleUrl: './area-usuario.component.scss'
})
export class AreaUsuarioComponent {
  
  constructor(
    private autenticacaoService : AutenticacaoService,
    private router : Router
  ) {}

  logout() {
    if (confirm("Tem certeza que deseja sair?")) {
      this.autenticacaoService.logout();
    this.router.navigate(["/principal/homePage"])
    }
  }

}
