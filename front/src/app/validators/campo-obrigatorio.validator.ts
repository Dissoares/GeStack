import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function campoObrigatorio(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    return valor === null || valor === undefined || valor === ''
      ? { campoObrigatorio: true }
      : null;
  };
}
