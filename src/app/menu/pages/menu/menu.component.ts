import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/menu/types/category.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { categoriesSelector } from 'src/app/menu/store/selectors';
import {
  fetchCategoriesAction,
} from 'src/app/menu/store/actions/fetchCategories.action';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor (private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.store.dispatch(fetchCategoriesAction());
  }

}
