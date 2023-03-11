import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { isAuthSelector } from 'src/app/auth/store/selectors';
import {
  setProductModalStatusAction,
} from 'src/app/menu/store/actions/set-product-modal-status.action';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isAuth$!: Observable<boolean>;
  public currentRoute!: any;
  private destroy$: Subject<void> = new Subject<void>();

  constructor (
    private store: Store<AppStateInterface>, private router: Router) { }

  public ngOnInit (): void {
    this.isAuth$ = this.store.pipe(select(isAuthSelector));
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)).
      subscribe(event => {
        this.currentRoute = event;
      });
  }

  onSetProductModalOpened () {
    this.store.dispatch(setProductModalStatusAction({ value: true }));
  }

  public ngOnDestroy (): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
