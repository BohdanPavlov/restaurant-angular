import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http'

import {
  registerAction,
  registerFailureAction,
  registerSuccessAction
} from 'src/app/auth/store/actions/register.action'
import {AuthService} from 'src/app/auth/services/auth.service'
import {PersistenceService} from 'src/app/shared/services/persistence.service'
import {
  AuthResponseInterface
} from 'src/app/auth/types/authResponse.interface';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({requestData}) => {
        return this.authService.auth(requestData, 'register').pipe(
          map((response: AuthResponseInterface) => {
            this.persistenceService.set('accessToken', response.accessToken)
            return registerSuccessAction({user: response.user })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({
                errorMessage: errorResponse.error
              })
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigate(['/menu'])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}
}
