import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  ButtonComponent,
} from 'src/app/shared/components/button/button.component';
import { ChatComponent } from 'src/app/shared/components/chat/chat.component';
import { DateComponent } from 'src/app/shared/components/date/date.component';
import {
  InputComponent,
} from 'src/app/shared/components/input/input.component';
import {
  ScrollUpComponent,
} from 'src/app/shared/components/scroll-up/scroll-up.component';
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
    DateComponent,
    ScrollUpComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
  ],
  exports: [
    ValidationErrorComponent,
    SearchComponent,
    InputComponent,
    ButtonComponent,
    DateComponent,
    ScrollUpComponent,
    ChatComponent,
  ],
})
export class SharedModule {}
