import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-campos-formulario',
  template: '',
})
export class CamposFormularioComponent {
  public formulario!: FormGroup;

  constructor(public fb: FormBuilder) {
    this.formulario = this.fb.group({});
  }

  public obterDadosFormulario() {
    return this.formulario.value;
  }

  public ehFormularioValido(): boolean {
    return this.formulario.valid;
  }

  public limparFormulario(): void {
    this.formulario.reset();
  }

  public marcarFormularioComoTocado(): void {
    this.formulario.markAllAsTouched();
  }
}
