import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fetchProductsByCategoryAction,
} from 'src/app/menu/store/actions/fetch-products-by-category.action';
import {
  setDetailsModalStatusAction,
} from 'src/app/menu/store/actions/set-details-modal-status.action';
import {
  setProductIngredientsAction,
} from 'src/app/menu/store/actions/set-product-ingredients.action';
import {
  setProductModalStatusAction,
} from 'src/app/menu/store/actions/set-product-modal-status.action';
import {
  setSelectedProductAction,
} from 'src/app/menu/store/actions/set-selected-product.action';

import { IProduct } from 'src/app/menu/types/product.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() public product!: IProduct;

  constructor (private store: Store<AppStateInterface>) { }

  public onGetProductsByCategory () {
    this.store.dispatch(
      fetchProductsByCategoryAction({ category: this.product.category }));
  }

  public onShowProductDetails () {
    this.store.dispatch(setDetailsModalStatusAction({ value: true }));
    this.store.dispatch(setSelectedProductAction({ product: this.product }));
  }

  public onEditProduct () {
    this.store.dispatch(setProductIngredientsAction({
      ingredients: this.product.info.ingredients
    }));
    this.store.dispatch(setSelectedProductAction({ product: this.product }));
    this.store.dispatch(setProductModalStatusAction({ value: true }));
  }
}
