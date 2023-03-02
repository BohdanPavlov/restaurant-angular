import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/menu/types/product.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { Store } from '@ngrx/store';
import {
  fetchProductsByCategoryAction
} from 'src/app/menu/store/actions/fetchProductsByCategory';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
  }

  onGetProductsByCategory() {
    this.store.dispatch(fetchProductsByCategoryAction({category: this.product.category}))
  }

}
