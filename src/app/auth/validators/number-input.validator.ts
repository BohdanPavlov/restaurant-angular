import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const numberInputValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control?.value;

  if (/^-?\d+$/.test(value)) {
    return null;
  }

  return { notInteger: true };
};
