import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private apiUrl = 'http://localhost:3000'; // Endereço do backend

  constructor(private http: HttpClient) { }

  visualizarFotosEvento(eventoId : number) {
    return this.http.get<any[]>(`${this.apiUrl}/foto/evento/${eventoId}`);
  }

  excluirFoto(fotoid : Number) {
    return this.http.delete<any[]>(`${this.apiUrl}/foto/${fotoid}`);

  }
}
