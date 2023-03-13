import { createAction } from '@ngrx/store';

import { AuthActionTypes } from 'src/app/auth/store/action-types';

export const switchAuthModeAction = createAction(AuthActionTypes.SWITCH_MODE);
