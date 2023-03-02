import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ICategory } from 'src/app/menu/types/category.interface';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  public fetchCategories(): Observable<ICategory[]> {
    const path = environment.apiBase + 'categories';
    return this.http.get<ICategory[]>(path)
  }
}
