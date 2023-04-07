import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';

export const addIngredientAction = createAction(
  MenuActionTypes.ADD_INGREDIENT,
  props<{ ingredient: string }>()
);
