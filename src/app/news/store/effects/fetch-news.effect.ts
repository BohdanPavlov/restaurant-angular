import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { NewsService } from 'src/app/news/services/news.service';
import {
  fetchNewsAction,
  fetchNewsFailureAction,
  fetchNewsSuccessAction,
} from 'src/app/news/store/actions/fetch-news.action';
import { INews } from 'src/app/news/types/news.interface';

@Injectable()
export class FetchNewsEffect {
  private fetchNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchNewsAction),
      switchMap(() => {
        return this.newsService.fetchNews().pipe(
          map((news: INews[]) => {
            return fetchNewsSuccessAction({ news });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              fetchNewsFailureAction({
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
    private newsService: NewsService
  ) {}
}
