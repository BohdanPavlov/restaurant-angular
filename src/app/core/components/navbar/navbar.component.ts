import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
export class NavbarComponent implements OnInit {
  public isAuth$!: Observable<boolean>;
  @Input() currentRouteUrl: string = '';

  constructor (
    private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.isAuth$ = this.store.pipe(select(isAuthSelector));
  }

  onSetProductModalOpened () {
    this.store.dispatch(setProductModalStatusAction({ value: true }));
  }
}
