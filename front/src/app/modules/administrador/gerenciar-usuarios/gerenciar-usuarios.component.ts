import { CamposFormularioComponent } from '../../../components/index.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ViewEncapsulation,
  Component,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NivelAcessoEnum, StatusEnum } from '../../../core/enums';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
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

  public listaNivelAcessoEnum: Array<NivelAcessoEnum> =
    NivelAcessoEnum.getAll();
  public listaStatusEnum: Array<StatusEnum> = StatusEnum.getAll();
  public dadosTabela = new MatTableDataSource<Usuario>([]);
  public colunasTabela: Array<string> = [
    'nome',
    'email',
    'perfil',
    'dataCadastro',
    'squad',
    'lider',
    'perfilLider',
    'acoes',
  ];

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly toastrService: ToastrService,
    private readonly route: ActivatedRoute
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.iniciarListagem();
  }

  public iniciarListagem(): void {
    const usuarios = this.route.snapshot.data['usuarios'] as Array<Usuario>;

    this.dadosTabela.data = usuarios;
    if (!usuarios.length) {
      this.toastrService.warning('Nenhum usuário encontrado.', 'Informação!');
    }
  }

  public ngAfterViewInit(): void {
    this.dadosTabela.paginator = this.paginator;
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idUsuario: [null],
      nomeUsuario: [null],
      email: [null],
      senha: [null],
      confirmarSenha: [null],
      nivelAcesso: [null],
      dataCadastro: [null],
      status: [null],
      nomeLider: [null],
      perfilLider: [null],
      nomeSquad: [null],
    });
  }

  public filtrar(): void {
    const filtro: Usuario = this.formulario.getRawValue();

    this.usuarioService.buscarPor(filtro).subscribe({
      next: (usuarios: Array<Usuario>) => {
        if (!usuarios.length) {
          this.toastrService.warning('Busca sem resultados.', 'Informação!');
          this.limpar();
          return;
        }

        this.dadosTabela.data = usuarios;
        this.dadosTabela.paginator = this.paginator;
      },
      error: (erro) => {
        console.error('Erro ao buscar usuários:', erro);
      },
    });
  }

  public getDescricaoPerfil(id: number): string {
    return NivelAcessoEnum.getById(id)?.nivel || '';
  }

  public desativar(id: number) {}

  public limpar(): void {
    this.dadosTabela.data = [];
    this.limparFormulario();
  }
}
