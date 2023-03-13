import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MenuService } from 'src/app/menu/services/menu.service';
import {
  createNewProductAction,
  createNewProductFailureAction,
  createNewProductSuccessAction,
} from 'src/app/menu/store/actions/create-new-product.action';

@Injectable()
export class CreateNewProductEffect {
  private createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewProductAction),
      switchMap(({ newProduct }) => {
        return this.menuService.createProduct(newProduct).pipe(
          map(product => {
            return createNewProductSuccessAction({ product });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createNewProductFailureAction({
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
