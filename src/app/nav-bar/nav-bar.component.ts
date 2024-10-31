import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit{
  public autenticacao$ = this.autenticacaoService.autenticacao$; 
    isMenuCollapsed = true;


  constructor(
    private autenticacaoService : AutenticacaoService,
    private router: Router
    )  {}

  ngOnInit(): void {    
  }  

  logout() {
    this.autenticacaoService.logout();
    this.router.navigate(["/principal/homePage"])
  }
}

