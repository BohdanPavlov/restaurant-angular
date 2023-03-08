import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { logoutAction } from 'src/app/auth/store/actions/logout.action';
import { userSelector } from 'src/app/auth/store/selectors';

import { IUser } from 'src/app/auth/types/user.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user$!: Observable<IUser | null>;
  public currentRoute!: any;
  private destroy$: Subject<void> = new Subject<void>();

  constructor (
    private store: Store<AppStateInterface>, private router: Router) { }

  public ngOnInit (): void {
    this.user$ = this.store.pipe(select(userSelector));
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)).
      subscribe(event => {
        this.currentRoute = event;
      });
  }

  public onLogout () {
    this.store.dispatch(logoutAction());
  }

  public ngOnDestroy (): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
