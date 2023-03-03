import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { MenuService } from 'src/app/menu/services/menu.service';
import { IProduct } from 'src/app/menu/types/product.interface';
import {
  fetchProductsByCategoryAction,
  fetchProductsByCategoryFailureAction,
  fetchProductsByCategorySuccessAction,
} from 'src/app/menu/store/actions/fetch-products-by-category.action';

@Injectable()
export class FetchProductsByCategoryEffect {
  fetchProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProductsByCategoryAction),
      switchMap(({category}) => {
        return this.menuService.fetchProductsByCategory(category).pipe(
          map((products: IProduct[]) => {
            return fetchProductsByCategorySuccessAction({ products });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              fetchProductsByCategoryFailureAction({
                errorMessage: errorResponse.message,
              }),
            );
          }),
        );
      }),
    ),
  );

  constructor (private actions$: Actions, private menuService: MenuService) {}
}
