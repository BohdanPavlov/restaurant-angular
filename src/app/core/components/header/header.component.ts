import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IUser } from 'src/app/auth/types/user.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { userSelector } from 'src/app/auth/store/selectors';
import { logoutAction } from 'src/app/auth/store/actions/logout.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$!: Observable<IUser | null>;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(userSelector))
  }

  onLogout() {
    this.store.dispatch(logoutAction())
  }

}
