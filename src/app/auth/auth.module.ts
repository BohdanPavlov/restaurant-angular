import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { reducer } from 'src/app/auth/store/reducers';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginEffect } from 'src/app/auth/store/effects/login.effect';
import {
  PersistenceService,
} from 'src/app/shared/services/persistence.service';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { LogoutEffect } from 'src/app/auth/store/effects/logout.effect';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
];

@NgModule({
  declarations: [
    AuthComponent,
  ],
	imports: [
		CommonModule,
		StoreModule.forFeature('auth', reducer),
		EffectsModule.forFeature([
			LoginEffect,
			RegisterEffect,
			LogoutEffect,
		]),
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		HttpClientModule,
		SharedModule,
	],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
