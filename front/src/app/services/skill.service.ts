import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/skill';

  constructor(private readonly http: HttpClient) {}

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

  public desativar(idSkill: number): Observable<Skill> {
    return this.http.put<Skill>(
      `${this.apiUrl}${this.endPointUrl}/desativar/${idSkill}`,
      {}
    );
  }

  public atualizar(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(
      `${this.apiUrl}${this.endPointUrl}/atualizar`,
      skill
    );
  }
}
