import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchProductsByCategoryAction } from 'src/app/menu/store/actions/fetch-products-by-category.action';
import { fetchProductsAction } from 'src/app/menu/store/actions/fetch-products.action';

import { ICategory } from 'src/app/menu/types/category.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() public category!: ICategory;

  public constructor(private store: Store<AppStateInterface>) {}

  public onGetProductsByCategory() {
    if (this.category.name === 'all') {
      this.store.dispatch(fetchProductsAction());
    } else {
      this.store.dispatch(
        fetchProductsByCategoryAction({ category: this.category.name })
      );
    }
  }
}
