import { Component, OnInit } from '@angular/core';
import {
  PersistenceService
} from 'src/app/shared/services/persistence.service';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { Store } from '@ngrx/store';
import {
  setAuthUserAction
} from 'src/app/auth/store/actions/setAuthUser.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'restaurant-angular';

  constructor (private persistenceService: PersistenceService, private store: Store<AppStateInterface>) {}

  ngOnInit (): void {
    const user = this.persistenceService.get('user');
    if (user) {
      this.store.dispatch(setAuthUserAction({ user }))
    }
  }
}
