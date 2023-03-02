import { MenuStateInterface } from 'src/app/menu/types/menuState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchCategoriesAction,
  fetchCategoriesFailureAction,
  fetchCategoriesSuccessAction,
} from 'src/app/menu/store/actions/fetchCategories.action';

const initialState: MenuStateInterface = {
  categories: null,
  products: null,
  categoriesStatus: 'idle',
  productsStatus: 'idle',
  errorMessage: '',
};

const menuReducer = createReducer(
  initialState,
  on(fetchCategoriesAction, (state): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'loading',
  })),
  on(fetchCategoriesSuccessAction, (state, action): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'success',
    categories: action.categories,
    errorMessage: '',
  })),
  on(fetchCategoriesFailureAction, (state, action): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'error',
    errorMessage: action.errorMessage,
  })),
);

export function reducer (state: MenuStateInterface, action: Action) {
  return menuReducer(state, action);
}
