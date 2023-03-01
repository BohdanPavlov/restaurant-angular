import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, pairwise, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import {
  AuthRequestDataInterface,
} from 'src/app/auth/types/authRequestData.interface';
import {
  switchAuthModeAction,
} from 'src/app/auth/store/actions/switchAuthMode.action';
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
  public errorMessage$!: Observable<string> | null;
  public isLoginMode!: boolean;
  private isLoginModeSub!: Subscription;

  constructor (
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
  ) {}

  ngOnInit (): void {
    this.initializeValues();
  }

  initializeValues (): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errorMessage$ = this.store.pipe(
      select(errorMessageSelector),
    );
    this.isLoginModeSub = this.store.pipe(select(isLoginModeSelector)).
      subscribe(isLoginMode => {
        this.isLoginMode = isLoginMode;
        this.initializeForm(isLoginMode);
      });
  }

  initializeForm (isLoginMode: boolean): void {
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

  onSubmit (): void {
    const requestData: AuthRequestDataInterface = this.authForm.value;
    if (this.isLoginMode) {
      this.store.dispatch(loginAction({ requestData }));
    } else {
      this.store.dispatch(registerAction({ requestData }));
    }
  }

  onToggleAuthMode (): void {
    this.store.dispatch(switchAuthModeAction());
  }

  ngOnDestroy (): void {
    this.isLoginModeSub.unsubscribe();
  }

  onClick(formField: any) {
    console.log(formField);
  }
}
