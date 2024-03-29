import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { PersistenceService } from 'src/app/auth/services/persistence.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from 'src/app/auth/store/actions/login.action';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';

@Injectable()
export class LoginEffect {
  private login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ requestData }) => {
        return this.authService.auth(requestData, 'login').pipe(
          map((response: AuthResponseInterface) => {
            this.persistenceService.set('accessToken', response.accessToken);
            this.persistenceService.set('user', response.user);
            console.log(response);
            return loginSuccessAction({ user: response.user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            return of(
              loginFailureAction({
                errorMessage: errorResponse.error.message,
              })
            );
          })
        );
      })
    )
  );

  private redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigate(['/menu']);
        })
      ),
    { dispatch: false }
  );

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}
}
