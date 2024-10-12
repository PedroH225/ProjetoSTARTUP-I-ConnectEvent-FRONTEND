import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoEventoService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) {}

  getTipoEvento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipo`);
  }
}
