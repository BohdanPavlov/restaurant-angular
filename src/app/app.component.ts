import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PersistenceService } from 'src/app/auth/services/persistence.service';
import {
  setAuthUserAction,
} from 'src/app/auth/store/actions/set-auth-user.action';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'restaurant-angular';

  constructor (
    private persistenceService: PersistenceService,
    private store: Store<AppStateInterface>) {}

  public ngOnInit (): void {
    const user = this.persistenceService.get('user');
    if (user) {
      this.store.dispatch(setAuthUserAction({ user }));
    }
  }
}
