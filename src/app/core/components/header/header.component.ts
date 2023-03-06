import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutAction } from 'src/app/auth/store/actions/logout.action';
import { userSelector } from 'src/app/auth/store/selectors';

import { IUser } from 'src/app/auth/types/user.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user$!: Observable<IUser | null>;

  constructor (
    private store: Store<AppStateInterface>, private router: Router) { }

  public ngOnInit (): void {
    this.user$ = this.store.pipe(select(userSelector));
  }

  public onLogout () {
    this.store.dispatch(logoutAction());
  }
}
