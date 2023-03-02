import { createAction, props } from '@ngrx/store';
import { MenuActionTypes } from 'src/app/menu/store/actionTypes';
import { ICategory } from 'src/app/menu/types/category.interface';

export const fetchCategoriesAction = createAction(
  MenuActionTypes.FETCH_CATEGORIES,
);

export const fetchCategoriesSuccessAction = createAction(
  MenuActionTypes.FETCH_CATEGORIES_SUCCESS,
  props<{ categories: ICategory[] }>(),
);

export const fetchCategoriesFailureAction = createAction(
  MenuActionTypes.FETCH_CATEGORIES_FAILURE,
  props<{ errorMessage: string }>(),
);
