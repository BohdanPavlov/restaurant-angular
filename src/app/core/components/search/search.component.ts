import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import {
  searchProductsAction,
} from 'src/app/menu/store/actions/search-products.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchForm!: FormGroup;

  constructor (
    private store: Store<AppStateInterface>, private fb: FormBuilder) {}

  ngOnInit (): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
  }

  public onSearch (): void | null {
    if (!this.searchForm.value.searchTerm) {
      alert('Please enter what you want to find!');
      return null;
    }

    this.store.dispatch(
      searchProductsAction({ searchTerm: this.searchForm.value.searchTerm }));
    this.searchForm.reset();
  }

}
