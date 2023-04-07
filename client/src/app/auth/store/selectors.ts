import { createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { AuthStateInterface } from 'src/app/auth/types/auth-state.interface';

export const authFeatureSelector = (
  state: AppStateInterface
): AuthStateInterface => state.auth;

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);

export const errorMessageSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.errorMessage
);

export const userSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.user
);

export const isAuthSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isAuth
);

export const isLoginModeSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoginMode
);
