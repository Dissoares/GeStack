import { CamposFormularioComponent } from '../../../components/index.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService, UsuarioService } from '../../../services';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NivelAcessoEnum } from '../../../core/enums';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../core/models';

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.scss'],
})
export class GerenciarUsuariosComponent
  extends CamposFormularioComponent
  implements OnInit
{
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public listaUsuarios: Array<Usuario> = [];

  public colunasTabela: string[] = [
    'nome',
    'email',
    'perfil',
    'dataCadastro',
    'status',
  ];
  public dadosTabela = new MatTableDataSource<Usuario>(this.listaUsuarios);

  constructor(private usuarioService: UsuarioService) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.filtrar();
  }

  public ngAfterViewInit() {
    this.dadosTabela.paginator = this.paginator;
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idUsuario: [null],
      nome: [null],
      email: [null],
      senha: [null],
      confirmarSenha: [null],
      nivelAcesso: [null],
      dataCadastro: [null],
      status: [null],
    });
  }

  public filtrar(): void {
    const filtro: Usuario = this.formulario.getRawValue();

    this.usuarioService
      .buscarPor(filtro)
      .subscribe((usuarios: Array<Usuario>) => {
        if (usuarios) {
          this.listaUsuarios = usuarios;
          this.dadosTabela.data = this.listaUsuarios;
        }
      });
  }

  public getDescricaoPerfil(id: number): string {
    return NivelAcessoEnum.getById(id)?.nivel || '';
  }

  public limpar(): void {
    this.limparFormulario();
  }
}
