import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) {}

  getCidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cidades`);
  }
}

