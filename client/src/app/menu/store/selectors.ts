import { createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { MenuStateInterface } from 'src/app/menu/types/menu-state.interface';

export const menuFeatureSelector = (
  state: AppStateInterface
): MenuStateInterface => state.menu;

export const categoriesSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.categories
);
export const productsSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.products
);

export const productsStatusSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.productsStatus
);

export const categoriesStatusSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.categoriesStatus
);

export const isDetailsModalOpenedSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.isDetailsModalOpened
);

export const isProductModalOpenedSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.isProductModalOpened
);

export const selectedProductSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.selectedProduct
);

export const newProductIngredientsSelector = createSelector(
  menuFeatureSelector,
  (state: MenuStateInterface) => state.newProductIngredients
);
