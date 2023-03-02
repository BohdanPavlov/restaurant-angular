import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/menu/types/category.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import {
  categoriesSelector, categoriesStatusSelector,
  productsSelector, productsStatusSelector,
} from 'src/app/menu/store/selectors';
import {
  fetchCategoriesAction,
} from 'src/app/menu/store/actions/fetchCategories.action';
import { MenuService } from 'src/app/menu/services/menu.service';
import {
  fetchProductsAction
} from 'src/app/menu/store/actions/fetchProducts.action';
import { IProduct } from 'src/app/menu/types/product.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public categoriesStatus$!: Observable<string>;
  public productsStatus$!: Observable<string>;

  constructor (private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.store.dispatch(fetchCategoriesAction());
    this.store.dispatch(fetchProductsAction())
    this.initializeValues()
  }

  private initializeValues() {
    this.categoriesStatus$ = this.store.pipe(select(categoriesStatusSelector))
    this.productsStatus$ = this.store.pipe(select(productsStatusSelector))
  }

}
