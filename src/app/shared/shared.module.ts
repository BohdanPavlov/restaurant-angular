import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    ValidationErrorComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
