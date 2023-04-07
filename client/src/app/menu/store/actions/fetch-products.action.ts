import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';
import { IProduct } from 'src/app/menu/types/product.interface';

export const fetchProductsAction = createAction(MenuActionTypes.FETCH_PRODUCTS);

export const fetchProductsSuccessAction = createAction(
  MenuActionTypes.FETCH_PRODUCTS_SUCCESS,
  props<{ products: IProduct[] }>()
);

export const fetchProductsFailureAction = createAction(
  MenuActionTypes.FETCH_PRODUCTS_FAILURE,
  props<{ errorMessage: string }>()
);
