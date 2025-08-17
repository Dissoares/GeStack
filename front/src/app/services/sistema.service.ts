import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sistema } from '../core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/sistema';

  constructor(private http: HttpClient) {}

  public cadastrar(sistema: Sistema): Observable<Sistema> {
    return this.http.post<Sistema>(
      `${this.apiUrl}${this.endPointUrl}/cadastrar`,
      sistema
    );
  }
}
