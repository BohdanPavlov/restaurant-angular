import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { Store } from '@ngrx/store';
import {
  setProductModalStatusAction
} from 'src/app/menu/store/actions/set-product-modal-status.action';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss']
})
export class AddProductButtonComponent implements OnInit {

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
  }

  onSetProductModalOpened() {
    this.store.dispatch(setProductModalStatusAction({value: true}))
  }

}
