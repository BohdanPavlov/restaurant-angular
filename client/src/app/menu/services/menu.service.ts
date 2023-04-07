import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICategory } from 'src/app/menu/types/category.interface';
import { IProduct } from 'src/app/menu/types/product.interface';

import { environment } from 'src/environments/environment';

@Injectable()
export class MenuService {
  public constructor(private http: HttpClient) {}

  public fetchCategories(): Observable<ICategory[]> {
    const path = environment.apiBase + 'categories';
    return this.http.get<ICategory[]>(path);
  }

  public fetchProducts(): Observable<IProduct[]> {
    const path = environment.apiBase + 'products';
    return this.http.get<IProduct[]>(path);
  }

  public fetchProductsByCategory(category: string): Observable<IProduct[]> {
    const path = environment.apiBase + `products/${category}`;
    return this.http.get<IProduct[]>(path);
  }

  public searchProducts(searchTerm: string): Observable<IProduct[]> {
    const path = environment.apiBase + `products/search/${searchTerm}`;
    return this.http.get<IProduct[]>(path);
  }

  public createProduct(formData: FormData): Observable<IProduct> {
    const path = environment.apiBase + 'products';
    return this.http.post<IProduct>(path, formData);
  }

  public updateProduct(id: number, formData: FormData): Observable<IProduct> {
    const path = environment.apiBase + `products/${id}`;
    return this.http.put<IProduct>(path, formData);
  }
}
