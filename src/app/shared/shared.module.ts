import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ButtonComponent,
} from 'src/app/shared/components/button/button.component';

import {
  InputComponent,
} from 'src/app/shared/components/input/input.component';
import {
  SearchComponent,
} from 'src/app/shared/components/search/search.component';
import {
  ValidationErrorComponent,
} from 'src/app/shared/components/validation-error/validation-error.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    ValidationErrorComponent,
    SearchComponent,
    InputComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    ValidationErrorComponent,
    SearchComponent,
    InputComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}
