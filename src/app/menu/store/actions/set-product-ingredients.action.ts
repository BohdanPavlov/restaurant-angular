import { createAction, props } from '@ngrx/store';
import { MenuActionTypes } from 'src/app/menu/store/action-types';

export const setProductIngredientsAction = createAction(
  MenuActionTypes.SET_PRODUCT_INGREDIENTS,
  props<{ ingredients: string[] }>(),
);
