import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isAuthSelector } from 'src/app/auth/store/selectors';
import { categoriesSelector } from 'src/app/menu/store/selectors';
import { ICategory } from 'src/app/menu/types/category.interface';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categories$!: Observable<ICategory[] | null>;
  public isAuth$!: Observable<boolean>;

  public constructor(private store: Store<AppStateInterface>) {}

  public ngOnInit(): void {
    this.categories$ = this.store.pipe(select(categoriesSelector));
    this.isAuth$ = this.store.pipe(select(isAuthSelector));
  }
}
