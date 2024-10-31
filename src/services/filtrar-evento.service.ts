import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrarEventoService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) {}

  filtrar(tipo: string, cidade: string, data: string): Observable<any[]> {
    let params = new HttpParams();

    // Adiciona os parâmetros somente se estiverem preenchidos
    if (tipo) {
      params = params.set('tipo', tipo);
    }
    if (cidade) {
      params = params.set('cidade', cidade);
    }
    if (data) {
      params = params.set('data', data);
    }

    return this.http.get<any[]>(`${this.apiUrl}/evento/filtrar`, { params });
  }

  // Area do usuário
  filtrarEventoOcorridos() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/organizador/ocorridos`, {
      headers: {'Authorization': `Bearer ${token}` }
    });
  }

  filtrarEventoAnunciados() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/organizador/eventoAnunciado`, {
      headers: {'Authorization': `Bearer ${token}` }
    });

  }
}