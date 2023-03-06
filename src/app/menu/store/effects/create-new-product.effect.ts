import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { MenuService } from 'src/app/menu/services/menu.service';
import {
  createNewProductAction,
  createNewProductFailureAction,
  createNewProductSuccessAction,
} from 'src/app/menu/store/actions/create-new-product.action';

@Injectable()
export class CreateNewProductEffect {
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewProductAction),
      switchMap(({newProduct}) => {
        return this.menuService.createProduct(newProduct).pipe(
          tap(data => console.log(data)),
          map((product) => {
            return createNewProductSuccessAction({product})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createNewProductFailureAction({
                errorMessage: errorResponse.message
              })
            )
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private menuService: MenuService) {}
}
