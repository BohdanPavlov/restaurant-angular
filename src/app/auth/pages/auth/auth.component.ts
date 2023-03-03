import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import {
  AuthRequestDataInterface,
} from 'src/app/auth/types/auth-request-data.interface';
import {
  switchAuthModeAction,
} from 'src/app/auth/store/actions/switch-auth-mode.action';
import {
  errorMessageSelector,
  isLoginModeSelector,
  isSubmittingSelector,
} from 'src/app/auth/store/selectors';
import { loginAction } from 'src/app/auth/store/actions/login.action';
import { registerAction } from 'src/app/auth/store/actions/register.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
  public authForm!: FormGroup;
  public isSubmitting$!: Observable<boolean>;
  public errorMessage$!: Observable<string>;
  public isLoginMode!: boolean;
  private destroy = new Subject();

  constructor (
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
  ) {}

  public ngOnInit (): void {
    this.initializeValues();
  }

  private initializeValues (): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errorMessage$ = this.store.pipe(
      select(errorMessageSelector),
    );
    this.store.pipe(select(isLoginModeSelector), takeUntil(this.destroy)).
      subscribe(isLoginMode => {
        this.isLoginMode = isLoginMode;
        this.initializeForm(isLoginMode);
      });
  }

  private initializeForm (isLoginMode: boolean): void {
    if (isLoginMode) {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  }

  public onSubmit (): void {
    const requestData: AuthRequestDataInterface = this.authForm.value;
    if (this.isLoginMode) {
      this.store.dispatch(loginAction({ requestData }));
    } else {
      this.store.dispatch(registerAction({ requestData }));
    }
  }

  public onToggleAuthMode (): void {
    this.store.dispatch(switchAuthModeAction());
  }

  public ngOnDestroy (): void {
    this.destroy.next('');
    this.destroy.complete();
  }
}
