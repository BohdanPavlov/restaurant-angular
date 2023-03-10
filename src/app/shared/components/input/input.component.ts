import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() classes: string = '';
  @Input() control?: AbstractControl | null;

  public value!: string;
  public errorMessages: Record<string, string> = {
    required: '* The field is required!',
    email: '* The email is invalid!',
    minlength: '* Should be longer!',
    passwordMismatch: '* Passwords do not match!',
    notInteger: '* Number must be integer!',
  };

  private onChange!: (value: string) => void;
  public onTouched!: () => void;

  public onInputValueChange (event: Event) {
    const targetElement = event.target as HTMLInputElement;
    const value = targetElement.value;

    this.onChange(value);
  }

  public registerOnChange (fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched (fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue (value: string): void {
    this.value = value;
  }
}
