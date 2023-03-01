import { createAction, props } from '@ngrx/store';

import { AuthActionTypes } from 'src/app/auth/store/actionTypes';
import {
  AuthRequestDataInterface,
} from 'src/app/auth/types/authRequestData.interface';
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
