import { ICategory } from 'src/app/menu/types/category.interface';
import { IProduct } from 'src/app/menu/types/product.interface';

export interface MenuStateInterface {
  categories: ICategory[] | null;
  products: IProduct[] | null;
  categoriesStatus: 'idle' | 'loading' | 'success' | 'error',
  productsStatus: 'idle' | 'loading' | 'success' | 'error',
  errorMessage: string;
}
