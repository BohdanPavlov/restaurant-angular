import { Action, createReducer, on } from '@ngrx/store';

import { MenuStateInterface } from 'src/app/menu/types/menu-state.interface';
import {
  fetchCategoriesAction,
  fetchCategoriesFailureAction,
  fetchCategoriesSuccessAction,
} from 'src/app/menu/store/actions/fetch-categories.action';
import {
  fetchProductsAction, fetchProductsFailureAction, fetchProductsSuccessAction,
} from 'src/app/menu/store/actions/fetch-products.action';
import {
  fetchProductsByCategoryAction,
  fetchProductsByCategoryFailureAction,
  fetchProductsByCategorySuccessAction,
} from 'src/app/menu/store/actions/fetch-products-by-category.action';
import {
  searchProductsAction,
  searchProductsFailureAction,
  searchProductsSuccessAction,
} from 'src/app/menu/store/actions/search-products.action';
import {
  setDetailsModalOpenedAction,
} from 'src/app/menu/store/actions/set-details-modal-opened.action';
import {
  setSelectedProductAction
} from 'src/app/menu/store/actions/set-selected-product.action';

const initialState: MenuStateInterface = {
  categories: null,
  products: null,
  categoriesStatus: 'idle',
  productsStatus: 'idle',
  categoriesErrorMessage: '',
  productsErrorMessage: '',
  isDetailsModalOpened: false,
  selectedProduct: null
};

const menuReducer = createReducer(
  initialState,
  on(fetchCategoriesAction, (state): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'loading',
  })),
  on(fetchProductsAction, fetchProductsByCategoryAction, searchProductsAction,
    (state): MenuStateInterface => ({
      ...state,
      productsStatus: 'loading',
      products: null,
    })),
  on(fetchCategoriesSuccessAction, (state, action): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'success',
    categories: action.categories,
    categoriesErrorMessage: '',
  })),
  on(fetchProductsSuccessAction, fetchProductsByCategorySuccessAction,
    searchProductsSuccessAction,
    (state, action): MenuStateInterface => ({
      ...state,
      productsStatus: 'success',
      products: action.products.length > 0 ? action.products : null,
      productsErrorMessage: '',
    })),
  on(fetchCategoriesFailureAction, (state, action): MenuStateInterface => ({
    ...state,
    categoriesStatus: 'error',
    categoriesErrorMessage: action.errorMessage,
  })),
  on(fetchProductsFailureAction, fetchProductsByCategoryFailureAction,
    searchProductsFailureAction,
    (state, action): MenuStateInterface => ({
      ...state,
      productsStatus: 'error',
      productsErrorMessage: action.errorMessage,
    })),
  on(setDetailsModalOpenedAction,
    (state, action): MenuStateInterface => ({
      ...state,
      isDetailsModalOpened: action.value,
    })),
  on(setSelectedProductAction,
    (state, action): MenuStateInterface => ({
      ...state,
      selectedProduct: action.product
    })),
);

export function reducer (state: MenuStateInterface, action: Action) {
  return menuReducer(state, action);
}
