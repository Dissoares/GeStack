import { CamposFormularioComponent } from '../../../components/index.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NivelAcessoEnum } from '../../../core/enums';
import { UsuarioService } from '../../../services';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';

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
  encapsulation: ViewEncapsulation.None,
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
    'acoes',
  ];
  public dadosTabela = new MatTableDataSource<Usuario>(this.listaUsuarios);

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly toastrService: ToastrService
  ) {
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
        if (!usuarios.length) {
          this.toastrService.warning('Busca sem resultados.', 'Informação!');
          this.limpar();
          return;
        }

        this.listaUsuarios = usuarios;
        this.dadosTabela.data = this.listaUsuarios;
        this.dadosTabela.paginator = this.paginator;
      });
  }

  public getDescricaoPerfil(id: number): string {
    return NivelAcessoEnum.getById(id)?.nivel || '';
  }

  public desativar(id: number) {}

  public limpar(): void {
    this.listaUsuarios = [];
    this.dadosTabela.data = [];
    this.limparFormulario();
  }
}
