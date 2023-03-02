import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MenuComponent } from './pages/menu/menu.component';
import {
  CategoriesComponent,
} from './components/categories/categories.component';
import { MenuService } from 'src/app/menu/services/menu.service';
import { reducer } from 'src/app/menu/store/reducers';
import { MenuRoutingModule } from 'src/app/menu/menu-routing.module';
import {
  FetchCategoriesEffect,
} from 'src/app/menu/store/effects/fetchCategories.effect';
import { CategoryComponent } from './components/category/category.component';
import {
  FetchProductsEffect,
} from 'src/app/menu/store/effects/fetchProducts.effect';
import { MatCardModule } from '@angular/material/card';
import {
  ProductCardComponent,
} from './components/product-card/product-card.component';
import {
  ProductsListComponent,
} from './components/products-list/products-list.component';
import {
  FetchProductsByCategoryEffect,
} from 'src/app/menu/store/effects/fetchProductsByCategory.effect';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    MenuComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductCardComponent,
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    StoreModule.forFeature('menu', reducer),
    EffectsModule.forFeature([
      FetchCategoriesEffect,
      FetchProductsEffect,
      FetchProductsByCategoryEffect,
    ]),
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [MenuService],
})
export class MenuModule {}
