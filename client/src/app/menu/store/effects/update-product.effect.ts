import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MenuService } from 'src/app/menu/services/menu.service';
import {
  updateProductAction,
  updateProductFailureAction,
  updateProductSuccessAction,
} from 'src/app/menu/store/actions/update-product.action';

@Injectable()
export class UpdateProductEffect {
  private updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductAction),
      switchMap(({ id, formData }) => {
        return this.menuService.updateProduct(id, formData).pipe(
          map(product => {
            alert('Successfully updated!');
            return updateProductSuccessAction({ product });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateProductFailureAction({
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
