import {
  SistemaService,
  UsuarioService,
  SkillService,
} from '../../../services';
import { DialogSistemaComponent } from '../../../dialogs/dialog-sistema/dialog-sistema.component';
import { CamposFormularioComponent } from '../../../components/index.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Sistema, Skill, Usuario } from '../../../core/models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { DialogSkillComponent } from '../../../dialogs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RotasEnum } from '../../../core/enums';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistemas-gerenciar',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './sistemas-gerenciar.component.html',
  styleUrls: ['./sistemas-gerenciar.component.scss'],
})
export class SistemasGerenciarComponent
  extends CamposFormularioComponent
  implements OnInit
{
  private readonly sistemaService = inject(SistemaService);
  private readonly toastrService = inject(ToastrService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      responsavel: [null],
      linkPrototipo: [null],
      linkDocumentacao: [null],
      linkGit: [null],
      linkProducao: [null],
      skills: [null, Validators.required],
    });
  }

  public cadastrarSistema(): void {
    const dialogRef = this.dialog.open(DialogSistemaComponent, {
      width: '1200px',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
