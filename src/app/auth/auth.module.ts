import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthInterceptor } from 'src/app/auth/services/auth-interceptor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginEffect } from 'src/app/auth/store/effects/login.effect';
import { LogoutEffect } from 'src/app/auth/store/effects/logout.effect';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';

import { reducer } from 'src/app/auth/store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './pages/auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([LoginEffect, RegisterEffect, LogoutEffect]),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
