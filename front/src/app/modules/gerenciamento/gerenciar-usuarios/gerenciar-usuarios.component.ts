import {
  ViewEncapsulation,
  Component,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import {
  CamposFormularioComponent,
  NadaEncontradoComponent,
} from '../../../components/index.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogConfirmacaoService, UsuarioService } from '../../../services';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogCadastroUsuarioComponent } from '../../../dialogs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PerfilEnum, StatusEnum } from '../../../core/enums';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [
    NadaEncontradoComponent,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTooltipModule,
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

  private readonly dialogService = inject(DialogConfirmacaoService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly toastrService = inject(ToastrService);
  private readonly dadosDialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);

  public listaPerfilEnum: Array<PerfilEnum> = PerfilEnum.getAll();
  public listaStatusEnum: Array<StatusEnum> = StatusEnum.getAll();

  public dadosTabela = new MatTableDataSource<Usuario>([]);
  public colunasTabela: Array<string> = [
    'id',
    'nome',
    'email',
    'perfil',
    'dataCadastro',
    'status',
    'acoes',
  ];

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.iniciarListagem();

    this.usuarioService.recarregarUsuarios$.subscribe(() => {
      this.usuarioService.listarUsuarios().subscribe({
        next: (usuarios: Array<Usuario>) => {
          this.dadosTabela.data = usuarios;
          this.dadosTabela.paginator = this.paginator;
        },
      });
    });
  }

  public iniciarListagem(): void {
    const usuarios = this.route.snapshot.data['usuarios'] as Array<Usuario>;
    this.dadosTabela.data = usuarios;
    this.dadosTabela.paginator = this.paginator;
  }

  public ngAfterViewInit(): void {
    this.dadosTabela.paginator = this.paginator;
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null],
      email: [null],
      perfil: [null],
      dataCriacao: [null],
      ativo: [null],
    });
  }

  public filtrar(): void {
    const filtro: Usuario = this.formulario.getRawValue();

    this.usuarioService.filtrarPor(filtro).subscribe({
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
    return PerfilEnum.getById(id)?.descricao || '';
  }

  public ativaDesativar(usuario: Usuario) {
    const statusOriginal = usuario.ativo;

    this.dialogService
      .openDialog({
        titulo: 'Confirmação!',
        acao: usuario.ativo ? 'desativar' : 'ativar',
        textoConfirmacao: 'Confirmar',
        textoCancelamento: 'Cancelar',
        icone: usuario.ativo ? 'person_off' : 'how_to_reg',
      })
      .subscribe((resultado) => {
        if (resultado) {
          usuario.ativo = !statusOriginal;

          this.usuarioService.ativaDesativar(usuario).subscribe({
            next: (resultado) => {
              if (resultado.ativo) {
                this.toastrService.success(
                  'Usuário ativado com sucesso!',
                  'Sucesso!'
                );
              } else {
                this.toastrService.info('Usuário desativado.', 'Informação!');
              }

              const index = this.dadosTabela.data.findIndex(
                (s) => s.id === resultado.id
              );
              if (index !== -1) {
                this.dadosTabela.data[index] = resultado;
              }
            },
            error: (erro) => {
              this.toastrService.error(
                'Não foi possível alterar o status do usuário',
                erro?.message
              );
              usuario.ativo = statusOriginal;
            },
          });
        } else {
          usuario.ativo = statusOriginal;
          const index = this.dadosTabela.data.findIndex(
            (s) => s.id === usuario.id
          );
          if (index !== -1) {
            this.dadosTabela.data[index] = { ...usuario };
            this.dadosTabela._updateChangeSubscription();
          }
        }
      });
  }

  public abrirDialog(usuario?: Usuario): void {
    const dialogRef = this.dadosDialog.open(DialogCadastroUsuarioComponent, {
      width: '900px',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'salvo') {
        this.toastrService.success('Cadastrado com sucesso!', 'Sucesso!');
      } else if (resultado === 'atualizado') {
        this.toastrService.success('Atualizado com sucesso!', 'Sucesso!');
      }
      this.usuarioService.recarregarUsuarios$.next();
    });
  }

  public excluir(id: number): void {
    this.dialogService
      .openDialog({
        titulo: 'Confirmação!',
        acao: 'Excluir',
        textoConfirmacao: 'Excluir',
        textoCancelamento: 'Cancelar',
      })
      .subscribe((resultado) => {
        if (resultado) {
          this.usuarioService.excluir(id).subscribe({
            next: () => {
              this.toastrService.info('Usuário excluído!', 'Aviso!');
              this.usuarioService.recarregarUsuarios$.next();
            },
            error: (erro) => {
              this.toastrService.error(erro?.error, 'Erro!');
              console.error(erro);
            },
          });
        }
      });
  }

  public limpar(): void {
    this.iniciarListagem();
    this.limparFormulario();
  }
}
