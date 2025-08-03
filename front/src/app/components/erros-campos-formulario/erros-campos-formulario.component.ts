import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-erro',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './erros-campos-formulario.component.html',
  styleUrls: ['./erros-campos-formulario.component.scss'],
})
export class ErrosCamposFormularioComponent {
  @Input() dadosCampo!: AbstractControl | FormControl | null;
  public campoVazio = new FormControl();

  public getMensagemDeErro(erro: ValidationErrors | null | undefined): string {
    if (!erro) return '';
    if (erro['campoObrigatorio']) return '*Campo obrigatório';
    if (erro['numeroInvalido']) return 'Digite um número válido';
    if (erro['cpfInvalido']) return 'Digite um CPF inválido';
    if (erro['emailInvalido']) return 'Digite um E-mail válido';
    if (erro['emailsNaoCoincidem']) return 'E-mails não coincidem';
    if (erro['minlength'])
      return `O tamanho mínimo é ${
        erro['minlength']['requiredLength'] + 3
      } caracteres`;
    return 'Erro desconhecido';
  }
}
