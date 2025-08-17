import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/skill';

  constructor(private http: HttpClient) {}

  public cadastrar(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(
      `${this.apiUrl}${this.endPointUrl}/cadastrar`,
      skill
    );
  }

  public buscarTudo(): Observable<Array<Skill>> {
    return this.http.get<Array<Skill>>(
      `${this.apiUrl}${this.endPointUrl}/buscarTudo`
    );
  }
}
