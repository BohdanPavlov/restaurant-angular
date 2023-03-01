import {createAction, props} from '@ngrx/store'

import {AuthActionTypes} from 'src/app/auth/store/actionTypes'
import {
  AuthRequestDataInterface
} from 'src/app/auth/types/authRequestData.interface';
import { IUser } from 'src/app/auth/types/user.interface';

export const registerAction = createAction(
  AuthActionTypes.REGISTER,
  props<{requestData: AuthRequestDataInterface}>()
)

export const registerSuccessAction = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{user: IUser}>()
)

export const registerFailureAction = createAction(
  AuthActionTypes.REGISTER_FAILURE,
  props<{errorMessage: string}>()
)
