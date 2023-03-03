import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { MenuService } from 'src/app/menu/services/menu.service';
import {
  fetchProductsAction, fetchProductsFailureAction, fetchProductsSuccessAction,
} from 'src/app/menu/store/actions/fetch-products.action';
import { IProduct } from 'src/app/menu/types/product.interface';

@Injectable()
export class FetchProductsEffect {
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProductsAction),
      switchMap(() => {
        return this.menuService.fetchProducts().pipe(
          map((products: IProduct[]) => {
            return fetchProductsSuccessAction({ products });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              fetchProductsFailureAction({
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
