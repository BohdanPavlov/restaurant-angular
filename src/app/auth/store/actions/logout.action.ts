import { createAction } from '@ngrx/store';

import { AuthActionTypes } from 'src/app/auth/store/action-types';

export const logoutAction = createAction(AuthActionTypes.LOGOUT);
