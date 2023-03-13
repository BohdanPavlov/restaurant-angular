import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MenuService } from 'src/app/menu/services/menu.service';

import {
  fetchCategoriesAction,
  fetchCategoriesFailureAction,
  fetchCategoriesSuccessAction,
} from 'src/app/menu/store/actions/fetch-categories.action';
import { ICategory } from 'src/app/menu/types/category.interface';

@Injectable()
export class FetchCategoriesEffect {
  private fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCategoriesAction),
      switchMap(() => {
        return this.menuService.fetchCategories().pipe(
          map((categories: ICategory[]) => {
            return fetchCategoriesSuccessAction({ categories });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              fetchCategoriesFailureAction({
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
