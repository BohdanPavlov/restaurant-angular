import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IProduct } from 'src/app/menu/types/product.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { selectedProductSelector } from 'src/app/menu/store/selectors';
import {
  setDetailsModalOpenedAction
} from 'src/app/menu/store/actions/set-details-modal-opened.action';
import {
  setSelectedProductAction
} from 'src/app/menu/store/actions/set-selected-product.action';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
})
export class ProductDetailsModalComponent implements OnInit, OnDestroy {
  public selectedProduct: IProduct | null = null;
  private destroy = new Subject<any>();

  constructor (private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.store.pipe(select(selectedProductSelector), takeUntil(this.destroy)).
      subscribe(product => this.selectedProduct = product);
  }

  public onCloseModal (event: MouseEvent): void | null {
    if (event.target === event.currentTarget) {
      this.store.dispatch(setDetailsModalOpenedAction({value: false}));
      this.store.dispatch(setSelectedProductAction({product: null}));
    }

    return null;
  }

  public ngOnDestroy (): void {
    this.destroy.next('');
    this.destroy.complete();
  }

}