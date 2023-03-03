import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';
import { IProduct } from 'src/app/menu/types/product.interface';

export const setSelectedProductAction = createAction(
  MenuActionTypes.SET_SELECTED_PRODUCT,
  props<{product: IProduct | null}>()
)
