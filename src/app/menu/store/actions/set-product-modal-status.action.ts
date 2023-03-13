import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';

export const setProductModalStatusAction = createAction(
  MenuActionTypes.SET_PRODUCT_MODAL_STATUS,
  props<{ value: boolean }>()
);
