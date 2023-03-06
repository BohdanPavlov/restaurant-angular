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
  setDetailsModalStatusAction,
} from 'src/app/menu/store/actions/set-details-modal-status.action';
import {
  setSelectedProductAction,
} from 'src/app/menu/store/actions/set-selected-product.action';
import {
  setProductModalStatusAction,
} from 'src/app/menu/store/actions/set-product-modal-status.action';
import {
  addIngredientAction,
} from 'src/app/menu/store/actions/add-ingredient.action';
import {
  deleteIngredientAction,
} from 'src/app/menu/store/actions/delete-ingredient.action';
import {
  createNewProductSuccessAction,
} from 'src/app/menu/store/actions/create-new-product.action';

const initialState: MenuStateInterface = {
  categories: null,
  products: null,
  categoriesStatus: 'idle',
  productsStatus: 'idle',
  categoriesErrorMessage: '',
  productsErrorMessage: '',
  isDetailsModalOpened: false,
  isProductModalOpened: false,
  selectedProduct: null,
  newProductIngredients: [],
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
  on(setDetailsModalStatusAction,
    (state, action): MenuStateInterface => ({
      ...state,
      isDetailsModalOpened: action.value,
    })),
  on(setProductModalStatusAction,
    (state, action): MenuStateInterface => ({
      ...state,
      isProductModalOpened: action.value,
    })),
  on(setSelectedProductAction,
    (state, action): MenuStateInterface => ({
      ...state,
      selectedProduct: action.product,
    })),
  on(addIngredientAction,
    (state, action): MenuStateInterface => ({
      ...state,
      newProductIngredients: [
        ...state.newProductIngredients,
        action.ingredient],
    })),
  on(deleteIngredientAction,
    (state, action): MenuStateInterface => ({
      ...state,
      newProductIngredients: state.newProductIngredients.filter(
        ingredient => ingredient !== action.ingredient),
    })),
  on(createNewProductSuccessAction,
    (state, action): MenuStateInterface => ({
      ...state,
      products: state.products ? [...state.products, action.product] : null,
      isProductModalOpened: false,
    })),
);

export function reducer (state: MenuStateInterface, action: Action) {
  return menuReducer(state, action);
}
