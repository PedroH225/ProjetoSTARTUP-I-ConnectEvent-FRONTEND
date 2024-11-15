import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:3000'; // Altere para a URL da sua API

  constructor(private http: HttpClient) { }

  getById(feedbackId : number): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/feedback/${feedbackId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  getSemFeedback(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/semFeedback`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  adicionarFeedback(eventoId : number, body : any) {
    const token = localStorage.getItem('token');

    return this.http.post<any[]>(`${this.apiUrl}/feedback/${eventoId}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  visualizarFeedbacksEvento(eventoId : number) {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/feedback/evento/${eventoId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  visualizarFeedbacksUsuario() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/feedback/usuario`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  editarFeedback(feedbackId : number, body : any) {
    const token = localStorage.getItem('token');

    return this.http.put<any[]>(`${this.apiUrl}/feedback/${feedbackId}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }
}
