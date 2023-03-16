import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { loginAction } from 'src/app/auth/store/actions/login.action';
import { registerAction } from 'src/app/auth/store/actions/register.action';
import { switchAuthModeAction } from 'src/app/auth/store/actions/switch-auth-mode.action';
import {
  errorMessageSelector,
  isLoginModeSelector,
  isSubmittingSelector,
} from 'src/app/auth/store/selectors';
import { AuthRequestDataInterface } from 'src/app/auth/types/auth-request-data.interface';
import { matchPasswordValidator } from 'src/app/auth/validators/match-password.validator';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public authForm!: FormGroup;
  public isSubmitting$!: Observable<boolean>;
  public errorMessage$!: Observable<string>;
  public isLoginMode!: boolean;
  private destroy$ = new Subject();

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errorMessage$ = this.store.pipe(select(errorMessageSelector));
    this.store
      .pipe(select(isLoginModeSelector), takeUntil(this.destroy$))
      .subscribe(isLoginMode => {
        this.isLoginMode = isLoginMode;
        this.initializeForm(this.isLoginMode);
      });
  }

  private initializeForm(isLoginMode: boolean): void {
    if (isLoginMode) {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    } else {
      this.authForm = this.fb.group(
        {
          email: [
            '',
            [
              Validators.required,
              Validators.email,
              Validators.pattern('^[^\\s]*$'),
            ],
          ],
          username: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern('^[^\\s]*$'),
            ],
          ],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.pattern('^[^\\s]*$'),
            ],
          ],
          confirmPassword: [
            '',
            [Validators.required, Validators.pattern('^[^\\s]*$')],
          ],
        },
        { validators: matchPasswordValidator }
      );
    }
  }

  public onSubmit(): void {
    const requestData: AuthRequestDataInterface = this.authForm.value;
    if (this.isLoginMode) {
      this.store.dispatch(loginAction({ requestData }));
    } else {
      this.store.dispatch(
        registerAction({
          requestData: {
            email: requestData.email,
            password: requestData.password,
            username: requestData.username,
          },
        })
      );
    }
  }

  public onToggleAuthMode(): void {
    this.router.navigate([this.isLoginMode ? '/register' : '/login']);
    this.store.dispatch(switchAuthModeAction());
  }

  public ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
