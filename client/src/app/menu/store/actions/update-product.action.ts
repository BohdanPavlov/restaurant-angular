import { createAction, props } from '@ngrx/store';

import { MenuActionTypes } from 'src/app/menu/store/action-types';
import { IProduct } from 'src/app/menu/types/product.interface';

export const updateProductAction = createAction(
  MenuActionTypes.UPDATE_PRODUCT,
  props<{ id: number; formData: FormData }>()
);

export const updateProductSuccessAction = createAction(
  MenuActionTypes.UPDATE_PRODUCT_SUCCESS,
  props<{ product: IProduct }>()
);

export const updateProductFailureAction = createAction(
  MenuActionTypes.UPDATE_PRODUCT_FAILURE,
  props<{ errorMessage: string }>()
);
