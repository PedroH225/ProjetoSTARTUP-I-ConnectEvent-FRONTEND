import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evento/anunciados`);
  }

  getEventoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evento/${id}`);
  }

  criarEvento(dados: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.apiUrl}/evento`, dados, {
      headers: { 'Authorization': `Bearer ${token}` }
  });
  }
}
