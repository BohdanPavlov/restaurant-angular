import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { setDetailsModalStatusAction } from 'src/app/menu/store/actions/set-details-modal-status.action';
import { setSelectedProductAction } from 'src/app/menu/store/actions/set-selected-product.action';
import { selectedProductSelector } from 'src/app/menu/store/selectors';

import { IProduct } from 'src/app/menu/types/product.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
})
export class ProductDetailsModalComponent implements OnInit, OnDestroy {
  public selectedProduct: IProduct | null = null;
  private destroy = new Subject<any>();

  public constructor(private store: Store<AppStateInterface>) {}

  public ngOnInit(): void {
    this.store
      .pipe(select(selectedProductSelector), takeUntil(this.destroy))
      .subscribe(product => (this.selectedProduct = product));
  }

  public onCloseModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.store.dispatch(setDetailsModalStatusAction({ value: false }));
      this.store.dispatch(setSelectedProductAction({ product: null }));
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next('');
    this.destroy.complete();
  }
}
