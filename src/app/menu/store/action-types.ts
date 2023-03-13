export enum MenuActionTypes {
  FETCH_CATEGORIES = '[Menu] Fetch categories',
  FETCH_CATEGORIES_SUCCESS = '[Menu] Fetch categories success',
  FETCH_CATEGORIES_FAILURE = '[Menu] Fetch categories failure',

  FETCH_PRODUCTS = '[Menu] Fetch products',
  FETCH_PRODUCTS_SUCCESS = '[Menu] Fetch products success',
  FETCH_PRODUCTS_FAILURE = '[Menu] Fetch products failure',

  FETCH_PRODUCTS_BY_CATEGORY = '[Menu] Fetch products by category',
  FETCH_PRODUCTS_BY_CATEGORY_SUCCESS = '[Menu] Fetch products by category success',
  FETCH_PRODUCTS_BY_CATEGORY_FAILURE = '[Menu] Fetch products by category failure',

  SEARCH_PRODUCTS = '[Menu] Search products',
  SEARCH_PRODUCTS_SUCCESS = '[Menu] Search products success',
  SEARCH_PRODUCTS_FAILURE = '[Menu] Search products failure',

  CREATE_NEW_PRODUCT = '[Menu] Create new product',
  CREATE_NEW_PRODUCT_SUCCESS = '[Menu] Create new product success',
  CREATE_NEW_PRODUCT_FAILURE = '[Menu] Create new product failure',

  UPDATE_PRODUCT = '[Menu] Update product',
  UPDATE_PRODUCT_SUCCESS = '[Menu] Update product success',
  UPDATE_PRODUCT_FAILURE = '[Menu] Update product failure',

  SET_DETAILS_MODAL_STATUS = '[Menu] Set details modal status',

  SET_PRODUCT_MODAL_STATUS = '[Menu] Set product modal status',

  SET_SELECTED_PRODUCT = '[Menu] Set selected product',

  SET_PRODUCT_INGREDIENTS = '[Menu] Set product ingredients',

  ADD_INGREDIENT = '[Menu] Add ingredient',

  DELETE_INGREDIENT = '[Menu] Delete ingredient',
}
