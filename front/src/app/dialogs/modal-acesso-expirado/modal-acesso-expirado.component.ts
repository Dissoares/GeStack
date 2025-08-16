import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CamposFormularioComponent } from '../../components/index.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { LoginDto } from '../../core/dtos';

type EstadoModal = 'expirado' | 'login';

@Component({
  selector: 'app-modal-acesso-expirado',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './modal-acesso-expirado.component.html',
  styleUrls: ['./modal-acesso-expirado.component.scss'],
})
export class ModalAcessoExpiradoComponent
  extends CamposFormularioComponent
  implements OnInit, OnDestroy
{
  private destruir$ = new Subject<void>();
  public estadoAtualAcesso: EstadoModal = 'expirado';
  public contadorAutoRedirecionar: number = 60;
  public mostrarSenha: boolean = false;
  private contadorSub?: any;

  get estadoExpirado(): boolean {
    return this.estadoAtualAcesso === 'expirado';
  }

  get estadoLogin(): boolean {
    return this.estadoAtualAcesso === 'login';
  }

  constructor(
    private readonly dialogRef: MatDialogRef<ModalAcessoExpiradoComponent>,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.iniciarContador();
  }

  public ngOnDestroy(): void {
    this.pararContador();
    this.destruir$.next();
    this.destruir$.complete();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
    });
  }

  private iniciarContador(): void {
    this.pararContador();
    this.contadorAutoRedirecionar = 60;

    this.contadorSub = timer(0, 1000)
      .pipe(takeUntil(this.destruir$))
      .subscribe(() => {
        if (
          this.estadoAtualAcesso === 'expirado' &&
          this.contadorAutoRedirecionar > 0
        ) {
          this.contadorAutoRedirecionar--;
        } else if (
          this.contadorAutoRedirecionar === 0 &&
          this.estadoAtualAcesso === 'expirado'
        ) {
          this.dialogRef.close();
          this.authService.logout();
        }
      });
  }

  private pararContador(): void {
    if (this.contadorSub) {
      this.contadorSub.unsubscribe();
      this.contadorSub = null;
    }
  }

  public login(): void {
    const dadosLogin: LoginDto = this.formulario.value;

    this.authService.login(dadosLogin).subscribe({
      next: () => {
        this.toastr.success('Login feito com sucesso!', 'Bem-vindo de volta!');
        this.dialogRef.close();
      },
      error: (erro) => {
        const msg = erro.error?.message;

        if (msg === 'Senha inválida') {
          this.toastr.error('Senha inválida', 'Erro!');
        } else {
          this.toastr.error(msg, 'Erro!');
        }
      },
    });
  }

  public refazerLogin(): void {
    this.estadoAtualAcesso = 'login';
  }

  public cancelar(): void {
    this.estadoAtualAcesso = 'expirado';
  }

  public visualizarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
