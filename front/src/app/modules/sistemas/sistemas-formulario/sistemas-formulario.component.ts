import {
  SistemaService,
  UsuarioService,
  SkillService,
} from '../../../services';
import { CamposFormularioComponent } from '../../../components/index.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Sistema, Skill, Usuario } from '../../../core/models';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  selector: 'app-sistemas-formulario',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './sistemas-formulario.component.html',
  styleUrls: ['./sistemas-formulario.component.scss'],
})
export class SistemasFormularioComponent
  extends CamposFormularioComponent
  implements OnInit
{
  private listaCores: Array<string> = [
    '#FFECB3',
    '#D1C4E9',
    '#BBDEFB',
    '#E1BEE7',
    '#FFE0B2',
    '#CFD8DC',
  ];

  public listaResponsaveis: Array<Usuario> = [];
  public listaSkills: Array<Skill> = [];

  private coresMapeadas = new Map<string, string>();
  private indiceCorAtual: number = 0;

  private readonly sistemaService = inject(SistemaService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly toastrService = inject(ToastrService);
  private readonly skillService = inject(SkillService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
    this.listarSkills();
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

  public cadastrar(): void {
    if (this.formulario.invalid) {
      this.toastrService.error(
        'Preencha todos os campos obrigatórios',
        'Erro!'
      );
      this.marcarFormularioComoTocado();
      return;
    }

    const sistema: Sistema = this.formulario.value;

    this.sistemaService.cadastrar(sistema).subscribe({
      next: (resultado) => {
        resultado
          ? this.toastrService.success('Sistema cadastrado!.', 'Sucesso!')
          : null;
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public cancelar(): void {
    this.limparFormulario();
    this.router.navigate([RotasEnum.HOME]);
  }

  public displayUsuario(usuario: Usuario): string {
    return usuario ? usuario.nome : '';
  }

  public removerResponsavelSelecionado(): void {
    this.formulario.get('responsavel')?.reset();
  }

  public pesquisarResponsavel(nome: string): void {
    this.usuarioService.buscarPor(nome).subscribe({
      next: (resultado) => {
        this.listaResponsaveis = resultado;
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public listarSkills(): void {
    this.skillService.buscarTudo().subscribe({
      next: (skills: Array<Skill>) => {
        this.listaSkills = skills.filter((skills) => skills.ativo === true);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public cadastrarSkills(): void {
    const dialogRef = this.dialog.open(DialogSkillComponent, {
      width: '1200px',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listarSkills();
    });
  }

  public getCoresTags(skill: Skill): string {
    if (this.coresMapeadas.has(skill.nome)) {
      return this.coresMapeadas.get(skill.nome)!;
    }
    const corSelecionada = this.listaCores[this.indiceCorAtual];
    this.coresMapeadas.set(skill.nome, corSelecionada);
    this.indiceCorAtual = (this.indiceCorAtual + 1) % this.listaCores.length;

    return corSelecionada;
  }

  public removerSkill(selecionada: Skill): void {
    const formulario = this.formulario.get('skills')?.value as Array<Skill>;
    this.formulario
      .get('skills')
      ?.setValue(formulario.filter((skill) => skill !== selecionada));
  }
}
