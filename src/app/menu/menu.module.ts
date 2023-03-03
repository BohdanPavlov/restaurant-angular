import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MenuComponent } from './pages/menu/menu.component';
import {
  CategoriesComponent,
} from './components/categories/categories.component';
import { MenuService } from 'src/app/menu/services/menu.service';
import { reducer } from 'src/app/menu/store/reducers';
import { MenuRoutingModule } from 'src/app/menu/menu-routing.module';
import {
  FetchCategoriesEffect,
} from 'src/app/menu/store/effects/fetch-categories.effect';
import { CategoryComponent } from './components/category/category.component';
import {
  FetchProductsEffect,
} from 'src/app/menu/store/effects/fetch-products.effect';
import {
  ProductCardComponent,
} from './components/product-card/product-card.component';
import {
  ProductsListComponent,
} from './components/products-list/products-list.component';
import {
  FetchProductsByCategoryEffect,
} from 'src/app/menu/store/effects/fetch-products-by-category.effect';
import {
  SearchProductsEffect,
} from 'src/app/menu/store/effects/search-products.effect';
import {
  ProductDetailsModalComponent,
} from './components/product-details-modal/product-details-modal.component';

@NgModule({
  declarations: [
    MenuComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductCardComponent,
    ProductsListComponent,
    ProductDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    StoreModule.forFeature('menu', reducer),
    EffectsModule.forFeature([
      FetchCategoriesEffect,
      FetchProductsEffect,
      FetchProductsByCategoryEffect,
      SearchProductsEffect,
    ]),
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [MenuService],
})
export class MenuModule {}
