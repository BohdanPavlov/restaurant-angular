import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IUser } from 'src/app/auth/types/user.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { userSelector } from 'src/app/auth/store/selectors';
import { logoutAction } from 'src/app/auth/store/actions/logout.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user$!: Observable<IUser | null>;

  constructor (private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.user$ = this.store.pipe(select(userSelector));
  }

  public onLogout () {
    this.store.dispatch(logoutAction());
  }
}
