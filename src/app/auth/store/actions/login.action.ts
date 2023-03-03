import { createAction, props } from '@ngrx/store';

import { AuthActionTypes } from 'src/app/auth/store/action-types';
import {
  AuthRequestDataInterface,
} from 'src/app/auth/types/auth-request-data.interface';
import { IUser } from 'src/app/auth/types/user.interface';

export const loginAction = createAction(
  AuthActionTypes.LOGIN,
  props<{ requestData: AuthRequestDataInterface }>(),
);

export const loginSuccessAction = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ user: IUser }>(),
);

export const loginFailureAction = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ errorMessage: string }>(),
);
