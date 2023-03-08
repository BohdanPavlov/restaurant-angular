import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { logoutAction } from 'src/app/auth/store/actions/logout.action';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }),
      ),
    { dispatch: false },
  );

  constructor (private actions$: Actions) {}
}
