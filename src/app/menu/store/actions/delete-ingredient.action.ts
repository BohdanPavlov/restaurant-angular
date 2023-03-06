import { createAction, props } from '@ngrx/store';
import { MenuActionTypes } from 'src/app/menu/store/action-types';

export const deleteIngredientAction = createAction(
  MenuActionTypes.DELETE_INGREDIENT,
  props<{ ingredient: string }>(),
);
