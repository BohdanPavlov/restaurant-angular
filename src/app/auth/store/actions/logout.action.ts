import {createAction} from '@ngrx/store'

import {AuthActionTypes} from 'src/app/auth/store/actionTypes'

export const logoutAction = createAction(AuthActionTypes.LOGOUT)
