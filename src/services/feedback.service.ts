import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:3000'; // Altere para a URL da sua API

  constructor(private http: HttpClient) { }

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
}
