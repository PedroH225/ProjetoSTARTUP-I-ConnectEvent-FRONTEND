import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  selectedOption: string = 'usuario';
  email: string = '';
  senha: string = '';

  constructor(private router: Router) {} // Injeta o serviço de roteamento

  fazerLogin(form: any) {
    if (form.valid) {
      form.ngSubmit.emit(); // Emite o evento de submit manualmente
    } else {
      console.log('Formulário inválido');
    }
  }

  onSubmit(form: any) {
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);
  }
}
