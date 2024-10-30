import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) {}

  registrarUsuario(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, dados);
  }
}
