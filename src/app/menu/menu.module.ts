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

@NgModule({
  declarations: [
    MenuComponent,
    CategoriesComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    StoreModule.forFeature('menu', reducer),
    EffectsModule.forFeature([
      FetchCategoriesEffect,
    ]),
  ],
  providers: [MenuService],
})
export class MenuModule {}
