import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmizadeService {
  private apiUrl = 'http://localhost:3000'; // Altere para a URL da sua API

  constructor(private http: HttpClient) {}

  // Listar pedidos de amizade pendentes
  getPedidosPendentes(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/amigo/pendentes`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  // Listar pedidos de amizade aceitos
  getPedidosAceitos(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/amigo/aceitos`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  // Listar pedidos de amizade recebidos
  getPedidosRecebidos(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/pedidos-recebidos`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  // Enviar um pedido de amizade
  enviarPedidoAmizade(destEmail: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post<any>(`${this.apiUrl}/pedidos-amizade/enviar`, { destEmail },
      {
        headers: { Authorization: `Bearer ${token}` },
      } );
  }

  // Aceitar um pedido de amizade
  aceitarPedidoAmizade(remetenteId: number): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post<any>(`${this.apiUrl}/pedidos-amizade/aceitar/${remetenteId}`, {},
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }

  // Excluir um pedido de amizade
  excluirPedidoAmizade(remetenteId: number): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.delete<any>(`${this.apiUrl}/pedidos-amizade/excluir/${remetenteId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  }
}
