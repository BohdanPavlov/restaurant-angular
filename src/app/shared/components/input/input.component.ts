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
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() public type: string = 'text';
  @Input() public placeholder: string = '';
  @Input() public classes: string = '';
  @Input() public control?: AbstractControl | null;

  public value!: string;

  private onChange!: (value: string) => void;
  public onTouched!: () => void;

  public onInputValueChange(event: Event) {
    const targetElement = event.target as HTMLInputElement;
    const value = targetElement.value;

    this.onChange(value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: string): void {
    this.value = value;
  }
}
