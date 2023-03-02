import { createAction, props } from '@ngrx/store';

import { AuthActionTypes } from 'src/app/auth/store/actionTypes';
import { IUser } from 'src/app/auth/types/user.interface';

export const setAuthUserAction = createAction(
  AuthActionTypes.SET_AUTH_USER,
  props<{ user: IUser }>(),
);
