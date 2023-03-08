import { Action, createReducer, on } from '@ngrx/store';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from 'src/app/auth/store/actions/login.action';
import { logoutAction } from 'src/app/auth/store/actions/logout.action';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from 'src/app/auth/store/actions/register.action';
import {
  setAuthUserAction,
} from 'src/app/auth/store/actions/set-auth-user.action';
import {
  switchAuthModeAction,
} from 'src/app/auth/store/actions/switch-auth-mode.action';

import { AuthStateInterface } from 'src/app/auth/types/auth-state.interface';

const initialState: AuthStateInterface = {
  user: null,
  isAuth: false,
  isSubmitting: false,
  errorMessage: '',
  isLoginMode: true,
};

const authReducer = createReducer(
  initialState,
  on(loginAction, registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
  })),
  on(loginSuccessAction, registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isAuth: true,
      user: action.user,
      errorMessage: '',
    })),
  on(loginFailureAction, registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      errorMessage: action.errorMessage,
      isSubmitting: false,
    })),
  on(switchAuthModeAction, (state): AuthStateInterface => ({
    ...state,
    isLoginMode: !state.isLoginMode,
    errorMessage: '',
  })),
  on(setAuthUserAction, (state, action): AuthStateInterface => ({
    ...state,
    user: action.user,
    isAuth: true,
  })),
  on(logoutAction, (state): AuthStateInterface => ({
    ...state,
    user: null,
    isAuth: false,
    isSubmitting: false,
  })),
);

export function reducer (state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
