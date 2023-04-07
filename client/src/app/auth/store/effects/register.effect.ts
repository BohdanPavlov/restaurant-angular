import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PersistenceService } from 'src/app/auth/services/persistence.service';

import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from 'src/app/auth/store/actions/register.action';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';

@Injectable()
export class RegisterEffect {
  private register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ requestData }) => {
        return this.authService.auth(requestData, 'register').pipe(
          map((response: AuthResponseInterface) => {
            this.persistenceService.set('accessToken', response.accessToken);
            this.persistenceService.set('user', response.user);
            return registerSuccessAction({ user: response.user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({
                errorMessage: errorResponse.error,
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
        ofType(registerSuccessAction),
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
