import { createAction, props } from '@ngrx/store';
import { MenuActionTypes } from 'src/app/menu/store/action-types';

export const setDetailsModalOpenedAction = createAction(
  MenuActionTypes.SET_DETAILS_MODAL_OPENED,
  props<{ value: boolean }>(),
);
