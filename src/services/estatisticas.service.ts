import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstatisticasService {
  private apiUrl = 'http://localhost:3000';
  
  constructor(
    private http: HttpClient
  ) { }

  getPizzaGenero(id: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/grafico/pizza-genero/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      responseType: 'blob' // A resposta é um arquivo binário (PNG/JPG)
    });
  }

  getHistogramaIdade(id : number): Observable<Blob> {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.apiUrl}/grafico/histograma-idade/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      responseType: 'blob' // A resposta é um arquivo binário (PNG/JPG)
    });
  }

  getLinhaParticipantes(id : number): Observable<Blob> {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.apiUrl}/grafico/linha-participados/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      responseType: 'blob' // A resposta é um arquivo binário (PNG/JPG)
    });
  }
}
