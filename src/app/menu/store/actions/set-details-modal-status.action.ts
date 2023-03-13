import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';

export const setDetailsModalStatusAction = createAction(
  MenuActionTypes.SET_DETAILS_MODAL_STATUS,
  props<{ value: boolean }>()
);
