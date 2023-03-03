import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { MenuService } from 'src/app/menu/services/menu.service';
import {
  searchProductsAction,
  searchProductsFailureAction,
  searchProductsSuccessAction,
} from 'src/app/menu/store/actions/search-products.action';
import { IProduct } from 'src/app/menu/types/product.interface';

@Injectable()
export class SearchProductsEffect {
  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProductsAction),
      switchMap(({ searchTerm }) => {
        const updatedSearchTerm = searchTerm.trim();
        return this.menuService.searchProducts(updatedSearchTerm).pipe(
          map((products: IProduct[]) => {
            return searchProductsSuccessAction({ products });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              searchProductsFailureAction({
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
