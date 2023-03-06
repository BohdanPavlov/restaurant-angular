import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/menu/types/category.interface';
import { IProduct } from 'src/app/menu/types/product.interface';

import { environment } from 'src/environments/environment';

@Injectable()
export class MenuService {

  constructor (private http: HttpClient) { }

  public fetchCategories (): Observable<ICategory[]> {
    const path = environment.apiBase + 'categories';
    return this.http.get<ICategory[]>(path);
  }

  public fetchProducts (): Observable<IProduct[]> {
    const path = environment.apiBase + 'products';
    return this.http.get<IProduct[]>(path);
  }

  public fetchProductsByCategory (category: string): Observable<IProduct[]> {
    const path = environment.apiBase + 'products';
    return this.http.get<IProduct[]>(path, {
      params: {
        category: category,
      },
    });
  }

  public searchProducts (searchTerm: string): Observable<IProduct[]> {
    const path = environment.apiBase + 'products';
    return this.http.get<IProduct[]>(path, {
      params: {
        'title_like': searchTerm,
      },
    });
  }

  public createProduct (product: IProduct): Observable<IProduct> {
    const path = environment.apiBase + 'products';
    return this.http.post<IProduct>(path, product);
  }

  public updateProduct (product: IProduct, id: number): Observable<IProduct> {
    const path = environment.apiBase + `products/${id}`;
    return this.http.put<IProduct>(path, product);
  }
}
