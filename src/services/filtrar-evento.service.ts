import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrarEventoService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) {}

  filtrar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/filtrar`);
  }
}
