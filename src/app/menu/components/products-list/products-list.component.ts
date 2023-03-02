import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { productsSelector } from 'src/app/menu/store/selectors';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/menu/types/product.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  public products$!: Observable<IProduct[] | null>;

  constructor(private store: Store<AppStateInterface>) { }

  public ngOnInit(): void {
    this.products$ = this.store.pipe(select(productsSelector));
  }

}
