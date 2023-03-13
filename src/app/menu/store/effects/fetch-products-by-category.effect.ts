import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MenuService } from 'src/app/menu/services/menu.service';
import {
  fetchProductsByCategoryAction,
  fetchProductsByCategoryFailureAction,
  fetchProductsByCategorySuccessAction,
} from 'src/app/menu/store/actions/fetch-products-by-category.action';
import { IProduct } from 'src/app/menu/types/product.interface';

@Injectable()
export class FetchProductsByCategoryEffect {
  private fetchProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProductsByCategoryAction),
      switchMap(({ category }) => {
        return this.menuService.fetchProductsByCategory(category).pipe(
          map((products: IProduct[]) => {
            return fetchProductsByCategorySuccessAction({ products });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              fetchProductsByCategoryFailureAction({
                errorMessage: errorResponse.message,
              })
            );
          })
        );
      })
    )
  );

  public constructor(
    private actions$: Actions,
    private menuService: MenuService
  ) {}
}
