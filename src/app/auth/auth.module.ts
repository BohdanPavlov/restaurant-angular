import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { reducer } from 'src/app/auth/store/reducers';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginEffect } from 'src/app/auth/store/effects/login.effect';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { LogoutEffect } from 'src/app/auth/store/effects/logout.effect';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  AuthInterceptor,
} from 'src/app/auth/services/auth-interceptor.service';
import { PersistenceService } from 'src/app/auth/services/persistence.service';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([
      LoginEffect,
      RegisterEffect,
      LogoutEffect,
    ]),
  ],
  providers: [
    AuthService,
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
