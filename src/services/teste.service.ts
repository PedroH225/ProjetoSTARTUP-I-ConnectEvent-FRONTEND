import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) {}

  // Método para pegar todos os eventos
  getEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evento`);
  }

  // Método para pegar um evento específico pelo ID
  getEventoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evento/${id}`);
  }
}
