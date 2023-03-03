import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';
import { IProduct } from 'src/app/menu/types/product.interface';

export const searchProductsAction = createAction(
  MenuActionTypes.SEARCH_PRODUCTS,
  props<{ searchTerm: string }>(),
);

export const searchProductsSuccessAction = createAction(
  MenuActionTypes.SEARCH_PRODUCTS_SUCCESS,
  props<{ products: IProduct[] }>(),
);

export const searchProductsFailureAction = createAction(
  MenuActionTypes.SEARCH_PRODUCTS_FAILURE,
  props<{ errorMessage: string }>(),
);
