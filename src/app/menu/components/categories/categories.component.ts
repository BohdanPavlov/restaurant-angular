import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/menu/types/category.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import {
  fetchCategoriesAction
} from 'src/app/menu/store/actions/fetch-categories.action';
import { categoriesSelector } from 'src/app/menu/store/selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories$!: Observable<ICategory[] | null>;

  constructor (private store: Store<AppStateInterface>) { }

  public ngOnInit (): void {
    this.categories$ = this.store.pipe(select(categoriesSelector));
  }
}
