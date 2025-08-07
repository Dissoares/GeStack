import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../core/dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/auth';

  constructor(private http: HttpClient) {}

  public login(usuario: LoginDto): Observable<LoginDto> {
    return this.http.post<LoginDto>(
      `${this.apiUrl}${this.endPointUrl}/login`,
      usuario
    );
  }

  public getNivelAcesso(): number {
    const token = localStorage.getItem('token');

    if (!token) return 0;

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      console.log('Payload decodificado:', payload);
      return payload.nivelAcesso || 0;
    } catch (error) {
      console.error('Error decoding token:', error);
      return 0;
    }
  }
}
