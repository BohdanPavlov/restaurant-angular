import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ICategory } from 'src/app/menu/types/category.interface';
import { IProduct } from 'src/app/menu/types/product.interface';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  public fetchCategories(): Observable<ICategory[]> {
    const path = environment.apiBase + 'categories';
    return this.http.get<ICategory[]>(path)
  }

  public fetchProducts(): Observable<IProduct[]> {
    const path = environment.apiBase + 'products';
    return this.http.get<IProduct[]>(path)
  }

  public fetchProductsByCategory(category: string): Observable<IProduct[]> {
    const path = environment.apiBase + 'products';
    return this.http.get<IProduct[]>(path, {
      params: {
        category: category
      }
    })
  }
}
