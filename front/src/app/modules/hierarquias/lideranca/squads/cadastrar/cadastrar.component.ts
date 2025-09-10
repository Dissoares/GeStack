import { CamposFormularioComponent } from '../../../../../components/index.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PerfilEnum } from '../../../../../core/enums';
import { AuthService } from '../../../../../services'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-cadastrar',
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
  ],
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent
  extends CamposFormularioComponent
  implements OnInit
{
  public formularioLider!: FormGroup;
  public listaPerfilEnum = PerfilEnum.getAll();
  constructor(private authService: AuthService) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.criarFormularioLider();
    this.obterLider();
  }
  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idSquad: [null],
      nome: [null],
      membros: [[]],
      dataCadastro: [null],
      ativo: [null],
    });
  }

  public criarFormularioLider(): void {
    this.formularioLider = this.fb.group({
      idUsuario: [null],
      nome: [{ value: null, disabled: true }],
      email: [null],
      perfil: [{ value: null, disabled: true }],
      dataCadastro: [null],
    });
  }

  public obterLider() {
    this.authService.usuarioLogado$.subscribe((liderLogado) => {
      if (liderLogado) {
        this.formularioLider.patchValue(liderLogado);
      }
    });
  }
}
