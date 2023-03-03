import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { IProduct } from 'src/app/menu/types/product.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import {
  fetchProductsByCategoryAction,
} from 'src/app/menu/store/actions/fetch-products-by-category.action';
import {
  setDetailsModalOpenedAction
} from 'src/app/menu/store/actions/set-details-modal-opened.action';
import {
  setSelectedProductAction
} from 'src/app/menu/store/actions/set-selected-product.action';

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

  public onShowProductDetails() {
    this.store.dispatch(setDetailsModalOpenedAction({value: true}));
    this.store.dispatch(setSelectedProductAction({product: this.product}))
  }
}
