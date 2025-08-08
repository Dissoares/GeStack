import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../core/dtos';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/auth';

  constructor(private http: HttpClient) {}

  public login(usuario: LoginDto): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        `${this.apiUrl}${this.endPointUrl}/login`,
        usuario
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
        })
      );
  }
}
