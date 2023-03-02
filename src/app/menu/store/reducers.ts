import { MenuStateInterface } from 'src/app/menu/types/menuState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchCategoriesAction,
  fetchCategoriesFailureAction,
  fetchCategoriesSuccessAction,
} from 'src/app/menu/store/actions/fetchCategories.action';
import {
  fetchProductsAction, fetchProductsFailureAction, fetchProductsSuccessAction,
} from 'src/app/menu/store/actions/fetchProducts.action';
import {
  fetchProductsByCategoryAction,
  fetchProductsByCategoryFailureAction,
  fetchProductsByCategorySuccessAction,
} from 'src/app/menu/store/actions/fetchProductsByCategory';

const initialState: MenuStateInterface = {
  categories: null,
  products: null,
  categoriesStatus: 'idle',
  productsStatus: 'idle',
  categoriesErrorMessage: '',
  productsErrorMessage: '',
};

const menuReducer = createReducer(
  initialState,
  on(fetchCategoriesAction, (state): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'loading',
  })),
  on(fetchProductsAction, fetchProductsByCategoryAction, (state): MenuStateInterface => ({
    ...state,
    productsStatus: 'loading',
  })),
  on(fetchCategoriesSuccessAction, (state, action): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'success',
    categories: action.categories,
    categoriesErrorMessage: '',
  })),
  on(fetchProductsSuccessAction, fetchProductsByCategorySuccessAction,(state, action): MenuStateInterface => ({
    ...state,
    productsStatus: 'success',
    products: action.products,
    productsErrorMessage: '',
  })),
  on(fetchCategoriesFailureAction, (state, action): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'error',
    categoriesErrorMessage: action.errorMessage,
  })),
  on(fetchProductsFailureAction, fetchProductsByCategoryFailureAction, (state, action): MenuStateInterface => ({
    ...state,
    productsStatus: 'error',
    productsErrorMessage: action.errorMessage,
  })),
);

export function reducer (state: MenuStateInterface, action: Action) {
  return menuReducer(state, action);
}
