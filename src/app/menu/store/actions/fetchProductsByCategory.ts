import { createAction, props } from '@ngrx/store';

import { IProduct } from 'src/app/menu/types/product.interface';
import { MenuActionTypes } from 'src/app/menu/store/actionTypes';

export const fetchProductsByCategoryAction = createAction(
  MenuActionTypes.FETCH_PRODUCTS_BY_CATEGORY,
  props<{ category: string }>(),
);

export const fetchProductsByCategorySuccessAction = createAction(
  MenuActionTypes.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
  props<{ products: IProduct[] }>(),
);

export const fetchProductsByCategoryFailureAction = createAction(
  MenuActionTypes.FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
  props<{ errorMessage: string }>(),
);
