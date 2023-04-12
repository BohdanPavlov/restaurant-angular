import { ICategory } from 'src/app/menu/types/category.interface';
import { IProduct } from 'src/app/menu/types/product.interface';

export interface MenuStateInterface {
  categories: ICategory[] | null;
  products: IProduct[];
  categoriesStatus: 'idle' | 'loading' | 'success' | 'error';
  productsStatus: 'idle' | 'loading' | 'success' | 'error';
  categoriesErrorMessage: string;
  productsErrorMessage: string;
  isDetailsModalOpened: boolean;
  isProductModalOpened: boolean;
  selectedProduct: IProduct | null;
  newProductIngredients: string[];
  isEditProductMode: boolean;
}
