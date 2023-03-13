import { createAction, props } from '@ngrx/store';

import { AuthActionTypes } from 'src/app/auth/store/action-types';
import { AuthRequestDataInterface } from 'src/app/auth/types/auth-request-data.interface';
import { IUser } from 'src/app/auth/types/user.interface';

export const registerAction = createAction(
  AuthActionTypes.REGISTER,
  props<{ requestData: AuthRequestDataInterface }>()
);

export const registerSuccessAction = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{ user: IUser }>()
);

export const registerFailureAction = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<{ errorMessage: string }>()
);
