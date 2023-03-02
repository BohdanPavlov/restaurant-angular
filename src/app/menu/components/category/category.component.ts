import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/menu/types/category.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { Store } from '@ngrx/store';
import {
  fetchProductsByCategoryAction
} from 'src/app/menu/store/actions/fetchProductsByCategory';
import {
  fetchProductsAction
} from 'src/app/menu/store/actions/fetchProducts.action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category!: ICategory;

  constructor(private store: Store<AppStateInterface>) { }

  public ngOnInit(): void {
  }

  onGetProductsByCategory() {
    if (this.category.name === 'all') {
      this.store.dispatch(fetchProductsAction())
    } else {
      this.store.dispatch(fetchProductsByCategoryAction({ category: this.category.name }))
    }
  }

}
