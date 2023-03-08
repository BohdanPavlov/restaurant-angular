import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RouterLink,
  RouterLinkActive,
  RouterLinkWithHref,
  RouterOutlet,
} from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';

import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    SharedModule,
    RouterLinkWithHref,
    RouterLink,
    RouterLinkActive,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
  ],
})
export class CoreModule {}
