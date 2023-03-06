import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { productsSelector } from 'src/app/menu/store/selectors';
import { IProduct } from 'src/app/menu/types/product.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  public products$!: Observable<IProduct[] | null>;

  constructor (private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.products$ = this.store.pipe(select(productsSelector), map(products => {
      if (products) {
        const productsCopy = [...products];
        productsCopy.sort(
          (a, b) => (a.category > b.category) ? 1 : ((b.category > a.category)
            ? -1
            : 0));
        return productsCopy;
      }

      return products;
    }));
  }
}
