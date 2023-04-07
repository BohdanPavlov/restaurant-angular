import { AbstractControl } from '@angular/forms';

export abstract class BasicForm {
  public getFirstControlError(control: AbstractControl): string | null {
    return control && control.errors && Object.keys(control.errors)[0];
  }

  public hasControlError(control: AbstractControl): boolean {
    return !!(control && control.touched && control.errors);
  }
}
