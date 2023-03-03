import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/menu/types/category.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { Store } from '@ngrx/store';
import {
  fetchProductsByCategoryAction,
} from 'src/app/menu/store/actions/fetch-products-by-category.action';
import {
  fetchProductsAction,
} from 'src/app/menu/store/actions/fetch-products.action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category!: ICategory;

  constructor (private store: Store<AppStateInterface>) { }

  onGetProductsByCategory () {
    if (this.category.id === 'all') {
      this.store.dispatch(fetchProductsAction());
    } else {
      this.store.dispatch(
        fetchProductsByCategoryAction({ category: this.category.id }));
    }
  }

}
