import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';
import { IProduct } from 'src/app/menu/types/product.interface';

export const createNewProductAction = createAction(
  MenuActionTypes.CREATE_NEW_PRODUCT,
  props<{ newProduct: IProduct }>()
);

export const createNewProductSuccessAction = createAction(
  MenuActionTypes.CREATE_NEW_PRODUCT_SUCCESS,
  props<{ product: IProduct }>()
);

export const createNewProductFailureAction = createAction(
  MenuActionTypes.CREATE_NEW_PRODUCT_FAILURE,
  props<{ errorMessage: string }>()
);
