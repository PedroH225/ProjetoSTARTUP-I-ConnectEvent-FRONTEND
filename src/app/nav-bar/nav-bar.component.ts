import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  encapsulation : ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {
  public autenticacao$ = this.autenticacaoService.autenticacao$;
  isMenuCollapsed = true;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {}

  logout() {
    if (confirm('Tem certeza que deseja sair?')) {
      this.autenticacaoService.logout();
      this.router.navigate(['/principal/homePage']);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
