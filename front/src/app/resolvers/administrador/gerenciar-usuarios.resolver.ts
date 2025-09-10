import { Observable, of, catchError } from 'rxjs';
import { UsuarioService } from '../../services';
import { Usuario } from '../../core/models';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GerenciarUsuariosResolver implements Resolve<Array<Usuario>> {
  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}

  resolve(): Observable<Array<Usuario>> {
    return this.usuarioService.listarUsuarios().pipe(
      catchError((erro) => {
        this.toastr.error('Falha ao carregar usuários. ', erro.message);
        return of([]);
      })
    );
  }
}
