import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend
  private autenticacaoSubject = new BehaviorSubject<boolean>(false);
  public autenticacao$ = this.autenticacaoSubject.asObservable();

  constructor(private http: HttpClient) {
    this.verificarAutenticacao(); // Verifica autenticação ao iniciar o serviço
  }

  public verificarAutenticacao(): void {
    const token = localStorage.getItem('token'); // Supondo que você armazena o token no localStorage

    if (token) {
      this.http.get<any>(`${this.apiUrl}/testartoken`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.autenticacaoSubject.next(true); // Atualiza o estado para verdadeiro
        },
        error: () => {
          this.autenticacaoSubject.next(false); // Atualiza o estado para falso
        }
      });
    } else {
      this.autenticacaoSubject.next(false); // Nenhum token, não autenticado
    }
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove o token do localStorage
    this.autenticacaoSubject.next(false); // Atualiza o estado para falso
  }
}
