import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  fetchCategoriesAction,
} from 'src/app/menu/store/actions/fetch-categories.action';
import {
  fetchProductsAction,
} from 'src/app/menu/store/actions/fetch-products.action';
import {
  categoriesStatusSelector,
  isDetailsModalOpenedSelector,
  isProductModalOpenedSelector,
  productsSelector,
  productsStatusSelector,
} from 'src/app/menu/store/selectors';
import { IProduct } from 'src/app/menu/types/product.interface';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public categoriesStatus$!: Observable<string>;
  public productsStatus$!: Observable<string>;
  public products$!: Observable<IProduct[] | null>;
  public isDetailsModalOpened$!: Observable<boolean>;
  public isProductModalOpened$!: Observable<boolean>;

  constructor (private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.store.dispatch(fetchProductsAction());
    this.store.dispatch(fetchCategoriesAction());
    this.initializeValues();
  }

  private initializeValues () {
    this.categoriesStatus$ = this.store.pipe(select(categoriesStatusSelector));
    this.productsStatus$ = this.store.pipe(select(productsStatusSelector));
    this.products$ = this.store.pipe(select(productsSelector));
    this.isDetailsModalOpened$ = this.store.pipe(
      select(isDetailsModalOpenedSelector));
    this.isProductModalOpened$ = this.store.pipe(
      select(isProductModalOpenedSelector));
  }

}
