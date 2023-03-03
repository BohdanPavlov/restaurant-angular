import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import {
  fetchCategoriesAction,
  fetchCategoriesFailureAction,
  fetchCategoriesSuccessAction,
} from 'src/app/menu/store/actions/fetch-categories.action';
import { MenuService } from 'src/app/menu/services/menu.service';
import { ICategory } from 'src/app/menu/types/category.interface';

@Injectable()
export class FetchCategoriesEffect {
  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCategoriesAction),
      switchMap(() => {
        return this.menuService.fetchCategories().pipe(
          map((categories: ICategory[]) => {
            return fetchCategoriesSuccessAction({categories})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              fetchCategoriesFailureAction({
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
