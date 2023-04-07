import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesComponent } from 'src/app/menu/components/categories/categories.component';
import { CategoryComponent } from 'src/app/menu/components/category/category.component';

import { MenuRoutingModule } from 'src/app/menu/menu-routing.module';
import { MenuService } from 'src/app/menu/services/menu.service';
import { CreateNewProductEffect } from 'src/app/menu/store/effects/create-new-product.effect';
import { FetchCategoriesEffect } from 'src/app/menu/store/effects/fetch-categories.effect';
import { FetchProductsByCategoryEffect } from 'src/app/menu/store/effects/fetch-products-by-category.effect';
import { FetchProductsEffect } from 'src/app/menu/store/effects/fetch-products.effect';
import { SearchProductsEffect } from 'src/app/menu/store/effects/search-products.effect';
import { UpdateProductEffect } from 'src/app/menu/store/effects/update-product.effect';
import { reducer } from 'src/app/menu/store/reducers';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

import { MenuComponent } from './pages/menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    ProductCardComponent,
    ProductsListComponent,
    ProductDetailsModalComponent,
    ProductModalComponent,
    CategoriesComponent,
    CategoryComponent,
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
      CreateNewProductEffect,
      UpdateProductEffect,
    ]),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TranslateModule,
  ],
  providers: [MenuService],
})
export class MenuModule {}
