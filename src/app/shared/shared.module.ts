import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ValidationErrorComponent
} from 'src/app/shared/components/validation-error/validation-error.component';



@NgModule({
  declarations: [
    ValidationErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ValidationErrorComponent]
})
export class SharedModule { }
