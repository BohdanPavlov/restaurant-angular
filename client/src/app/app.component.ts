import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';

import { PersistenceService } from 'src/app/auth/services/persistence.service';
import { setAuthUserAction } from 'src/app/auth/store/actions/set-auth-user.action';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'restaurant-angular';
  public currentRoute!: any;
  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private persistenceService: PersistenceService,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const user = this.persistenceService.get('user');
    if (user) {
      this.store.dispatch(setAuthUserAction({ user }));
    }
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        this.currentRoute = event;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
